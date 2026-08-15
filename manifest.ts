import { ManifestV3Export } from "@crxjs/vite-plugin"

const baseManifest: ManifestV3Export = {
  manifest_version: 3,
  version: '2.8.20',
  name: 'My Fingerprint',
  default_locale: 'zh',
  description: '__MSG_ext_desc__',
  host_permissions: [
    '<all_urls>',
  ],
  icons: {
    128: 'logo.png',
  },
  action: {
    default_popup: "src/popup/index.html",
  },
  web_accessible_resources: []
}

const VALUES = {
  background: "src/background/index.ts",
  content: {
    matches: ["<all_urls>"],
    js: ["src/scripts/content.ts"],
    run_at: "document_start",
    match_about_blank: true,
    // all_frames: true,
  },
}

export const chromeManifest: ManifestV3Export = {
  ...baseManifest,
  minimum_chrome_version: '102',
  key: "b21lZ2FlZS9teS1maW5nZXJwcmludAo=",
  update_url: 'https://raw.githubusercontent.com/omegaee/my-fingerprint/refs/heads/main/updates.xml',
  permissions: [
    'storage',
    'tabs',
    'activeTab',
    'webNavigation',
    'scripting',
    "userScripts",
    'declarativeNetRequest',
    'clipboardRead',
    'clipboardWrite',
    'privacy',
  ],
  optional_permissions: [
    'browsingData',
  ],
  background: {
    service_worker: VALUES.background,
  },
  content_scripts: [
    {
      // @ts-ignore
      world: "ISOLATED",
      ...VALUES.content,
    },
  ],
}

export const firefoxManifest: ManifestV3Export = {
  ...baseManifest,
  browser_specific_settings: {
    // @ts-ignore
    gecko: {
      // 必须与 AMO 上已登记的插件 ID 一致
      id: "{8f3c2a1e-9b4d-4e7f-a6c5-1d0e8f7a6b5c}",
      strict_min_version: "140.0",
      // AMO 2025-11 起新插件必填：本扩展不向外传输个人数据
      data_collection_permissions: {
        required: ["none"],
      },
    }
  },
  permissions: [
    'storage',
    'tabs',
    'activeTab',
    'webNavigation',
    'scripting',
    'declarativeNetRequest',
    'clipboardRead',
    'clipboardWrite',
    'privacy',
  ],
  optional_permissions: [
    // Firefox 中 userScripts 只能是 optional-only，不可放在 permissions
    'userScripts',
    'browsingData',
  ],
  background: {
    scripts: [VALUES.background],
  },
  content_scripts: [
    VALUES.content,
  ],
}

import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const STORE_APP_URL =
  process.env.NEXT_PUBLIC_STORE_APP_URL || "http://localhost:3008";

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    store: `store@${STORE_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const federationConfig = {
  name: "remoteAccount",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "/": "./src/pages/index.tsx",
    "./login": "./src/pages/login.tsx",
  },
  shared: {
    "@mui/material/": {
      eager: true,
      requiredVersion: "5.15.16",
      singleton: true,
    },
  },
  extraOptions: {
    exposePages: true,
  },
};

const nextConfig = {
  reactStrictMode: true,

  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        ...federationConfig,
        remotes: remotes(isServer),
      })
    );

    return config;
  },
};

export default nextConfig;

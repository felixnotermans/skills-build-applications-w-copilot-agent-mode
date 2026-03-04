const isGithubDevHost = (hostname) => hostname.endsWith('.app.github.dev');

const deriveCodespaceNameFromHost = (hostname) => {
  if (!isGithubDevHost(hostname)) {
    return '';
  }

  const match = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);
  return match?.[1] || '';
};

export const getApiEndpoint = (resource) => {
  const configuredCodespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const hostname = window.location.hostname;
  const derivedCodespaceName = deriveCodespaceNameFromHost(hostname);
  const codespaceName = configuredCodespaceName || derivedCodespaceName;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
};

export const normalizeApiList = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

import packageJson from '../../package.json';

export const loader = () => {
  return new Response(JSON.stringify({ version: packageJson.version }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

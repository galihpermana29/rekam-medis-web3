// import tes from 'ipfs-http-client';

const projectId = '2IgLfSjJkh4rqMgcE9c1SJdu4Yb';
const projectSecret = 'e31edc76c41b4e4664d544f14930eae8';
const auth =
	'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// export const client = create({
// 	host: 'ipfs.infura.io',
// 	port: 5001,
// 	protocol: 'https',
// 	headers: {
// 		authorization: auth,
// 	},
// });

const IPFS = require('ipfs-api');
const { ipfsClient, globSource, create } = require('ipfs-http-client');

export const ipfs = new IPFS({
	host: 'ipfs.infura.io',
	apiPath: '/api/v0',
	port: 5001,
	protocol: 'https',
	headers: {
		authorization: auth,
		'Access-Control-Allow-Origin': ['*'],
		Origin: 'https://ipfs.infura.io:5001',
		'User-Agent': 'foo',
	},
});

export async function addFile() {
	console.log(ipfsClient);
	const auth =
		'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

	const client = await create({
		host: 'ipfs.infura.io',
		port: 5001,
		protocol: 'https',
		headers: {
			authorization: auth,
		},
	});

	for await (const file of client.addAll(globSource('./docs', '**/*'))) {
		console.log(file);
	}
}

// export default ipfs;

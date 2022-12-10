import { useEffect } from 'react';
import { useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import { saveText } from '../../ipfs2';
import { useForm } from 'antd/es/form/Form';
import {
	Form,
	Input,
	DatePicker,
	Checkbox,
	Button,
	Row,
	Col,
	Spin,
	message,
} from 'antd';

import moment from 'moment';

const halfLayout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
	labelAlign: 'left',
};

const fullLayout = {
	labelCol: { span: 12 },
	wrapperCol: { span: 12 },
	labelAlign: 'left',
};

const Home = () => {
	const {
		state: { contract, accounts, web3 },
	} = useEth();

	const [activeTabs, setActiveTabs] = useState(1);
	const [form] = useForm();
	const [data, setData] = useState({
		buffer: null,
		web3: null,
		stgValue: 0,
		ipfsHash: null,
		transactionHash: null,
	});

	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState('');
	const {
		alkohol = [0],
		diabetes = [0],
		koletrol = [0],
		namaPasien,
		operasi,
		perokok = [0],
		punyaAnak = [0],
		tglLahir,
		wali,
	} = search;

	// const {alkohol, }
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const d = await saveText({ content: data.buffer });
	// 	setData({ ipfsHash: d.path });
	// 	const res = await contract?.methods.set(d.path).send({ from: accounts[0] });
	// 	const get = await contract?.methods.get().call();
	// 	const ff = web3.eth.getTransaction(res.transactionHash, (err, res) => {
	// 		console.log(res, 'ress');
	// 		console.log(web3.utils.hexToAscii(res.input), 'hasil');
	// 	});
	// };

	// const handleChangeImages = async (e) => {
	// 	e.preventDefault();
	// 	const file = e.target.files[0];
	// 	const reader = new window.FileReader();
	// 	reader.readAsArrayBuffer(file);

	// 	reader.onloadend = () => {
	// 		setData({ buffer: Buffer(reader.result) });
	// 	};
	// };

	const interact = async () => {
		const data = await contract?.methods.get().call();
		setData({ ipfsHash: data });
	};

	const handleSubmitForm = async (value) => {
		const d = await saveText({ content: JSON.stringify(value) });
		setData({ ipfsHash: d.path });
		const res = await contract?.methods.set(d.path).send({ from: accounts[0] });
		const get = await contract?.methods.get().call();
		setData({ transactionHash: res.transactionHash });
	};

	const handleSearch = async (value) => {
		setLoading(true);
		try {
			web3.eth.getTransaction(value.hash, async (err, res) => {
				const ipfsReturn = web3.utils.hexToAscii(res.input);
				const split = ipfsReturn.split('.')[1];

				const data = await fetch(`https://ipfs.io/ipfs/${split}`, {
					method: 'GET',
				});

				const pp = await data.json();
				setSearch(pp);
			});
		} catch (error) {
			message.error('Blockchain traffic is busy right now!');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			interact();
		}, 1500);
	}, [accounts]);

	return (
		<>
			<nav
				style={{
					display: 'flex',
					alignItems: 'center',
					alignContent: 'center',
					justifyContent: 'space-between',
					background: 'black',
					color: 'white',
					padding: '1rem 2rem',
					position: 'fixed',
					left: '0',
					right: '0',
					zIndex: '20',
				}}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<p
						style={{ marginRight: '20px', cursor: 'pointer' }}
						onClick={() => setActiveTabs(1)}>
						Form riwayat sakit
					</p>
					<p
						style={{ marginRight: '20px', cursor: 'pointer' }}
						onClick={() => setActiveTabs(2)}>
						Cari riwayat sakit
					</p>
				</div>
				<div>
					<Button>{accounts ? 'Now you are in' : 'Log In'}</Button>
				</div>
			</nav>
			{activeTabs === 1 && (
				<div style={{ marginTop: '100px' }}>
					{data.transactionHash && (
						<p>Pasien ID Hash: {data.transactionHash}</p>
					)}
					<h2 style={{ margin: '2rem 0' }}>
						Form Riwayat Penyakit Pasien Rumah Sakit Santa Claus
					</h2>
					<Form
						form={form}
						style={{ margin: '3rem 0' }}
						onFinish={handleSubmitForm}>
						<Form.Item
							{...halfLayout}
							name="namaPasien"
							label="Nama Pasien"
							rules={[
								{ required: true, message: 'You have to input this field' },
							]}>
							<Input placeholder="Nama Pasien" />
						</Form.Item>
						<Form.Item
							{...halfLayout}
							name="tglLahir"
							label="Tanggal Lahir"
							rules={[
								{ required: true, message: 'You have to input this field' },
							]}>
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
						<Form.Item {...halfLayout} name="wali" label="Nama Wali">
							<Input placeholder="Nama Pasien" />
						</Form.Item>
						<h3>Riwayat Kesehatan:</h3>
						<Form.Item
							{...fullLayout}
							name="diabetes"
							label="Penderita Diabetes">
							<Checkbox.Group
								options={[
									{ label: 'Ya', value: 'Ya' },
									{ label: 'Tidak', value: 'Tidak' },
								]}
								defaultValue=""
								// onChange={onChange}
							/>
						</Form.Item>
						<Form.Item
							{...fullLayout}
							name="koletrol"
							label="Penderita Kolesterol">
							<Checkbox.Group
								options={[
									{ label: 'Ya', value: 'Ya' },
									{ label: 'Tidak', value: 'Tidak' },
								]}
								defaultValue=""
								// onChange={onChange}
							/>
						</Form.Item>
						<Form.Item {...fullLayout} name="perokok" label="Perokok">
							<Checkbox.Group
								options={[
									{ label: 'Ya', value: 'Ya' },
									{ label: 'Tidak', value: 'Tidak' },
								]}
								defaultValue=""
								// onChange={onChange}
							/>
						</Form.Item>
						<Form.Item {...fullLayout} name="alkohol" label="Minum Alkohol">
							<Checkbox.Group
								options={[
									{ label: 'Ya', value: 'Ya' },
									{ label: 'Tidak', value: 'Tidak' },
								]}
								defaultValue=""
								// onChange={onChange}
							/>
						</Form.Item>
						<Form.Item {...fullLayout} name="punyaAnak" label="Punya Anak">
							<Checkbox.Group
								options={[
									{ label: 'Ya', value: 'Ya' },
									{ label: 'Tidak', value: 'Tidak' },
								]}
								defaultValue=""
								// onChange={onChange}
							/>
						</Form.Item>

						<h3>Riwayat Operasi:</h3>
						<Form.Item {...halfLayout} name="operasi" label="Pernah dioperasi">
							<Input placeholder="Nama Operasi" />
						</Form.Item>
						<Form.Item>
							<Button
								style={{ marginBottom: '3rem', width: '100%' }}
								color="blue"
								type="primary"
								htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			)}
			{activeTabs === 2 && (
				<div style={{ marginTop: '100px' }}>
					<div style={{ margin: '3rem 0' }}>
						<Form form={form} onFinish={handleSearch}>
							<Row gutter={[12, 12]}>
								<Col span={20}>
									<Form.Item name="hash">
										<Input
											placeholder="Input your ID pasien"
											style={{ width: '100%' }}
										/>
									</Form.Item>
								</Col>
								<Form.Item>
									<Button color="blue" type="primary" htmlType="submit">
										Search
									</Button>
								</Form.Item>
							</Row>
						</Form>
					</div>
					{loading && <Spin />}
					{search && (
						<div>
							<Row>
								<Col span={8}>Nama Pasien: </Col>
								<Col>{namaPasien}</Col>
							</Row>
							<Row>
								<Col span={8}>Tanggal Lahir: </Col>
								<Col>{moment(tglLahir).format('YYYY-MM-DD')}</Col>
							</Row>
							<Row>
								<Col span={8}>Nama Wali: </Col>
								<Col>{wali}</Col>
							</Row>
							<Row>
								<Col span={8}>Penderita diabetes: </Col>
								<Col>{diabetes}</Col>
							</Row>
							<Row>
								<Col span={8}>Penderita Kolesterol: </Col>
								<Col>{koletrol}</Col>
							</Row>
							<Row>
								<Col span={8}>Perokok: </Col>
								<Col>{perokok}</Col>
							</Row>
							<Row>
								<Col span={8}>Minum Alkohol: </Col>
								<Col>{alkohol}</Col>
							</Row>
							<Row>
								<Col span={8}>Punya Anak: </Col>
								<Col>{punyaAnak}</Col>
							</Row>
							<Row>
								<Col span={8}>Riwayat Operasi: </Col>
								<Col>{operasi}</Col>
							</Row>
						</div>
					)}
				</div>
			)}
			{/* {accounts && <h1>{accounts}</h1>} */}
			{/* <h1>Store an Image to IPFS</h1>
			<p>Select your image:</p>
			<form onSubmit={handleSubmit}>
				<input
					type="file"
					name="image"
					id="image"
					onChange={handleChangeImages}
				/>
				<button type="submit">Post</button>
			</form>
			{data.ipfsHash && (
				<img src={`https://ipfs.io/ipfs/${data.ipfsHash}`} alt="d" />
			)} */}
		</>
	);
};

export default Home;

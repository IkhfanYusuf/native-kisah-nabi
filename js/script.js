

	document.getElementById('search-form').addEventListener('submit', async (e) => {
		e.preventDefault();
		const query = document.getElementById('Search').value;
		const contentLeft = document.querySelector('.dataLeft');
		const contentRight = document.querySelector('.dataRight');
		const dataApi = await fetchApi(query);
		console.log(dataApi);

		if(dataApi.success === false){
			contentHtml.innerHTML = dataApi.message;
		}else{
			setContentLeft(dataApi, contentLeft);
			setContentRight(dataApi, contentRight);

		}
		
		
	})

	const setContentLeft = (dataApi, contentHtml) => {
		contentHtml.innerHTML = `
			<table>
				<tr>
					<td>Nama</td>
					<td>:</td>
					<td>${dataApi.nabi.nama}</td>
				</tr>
				<tr>
					<td>Lahir</td>
					<td>:</td>
					<td>${dataApi.nabi.lahir}</td>
				</tr>
				<tr>
					<td>Umur</td>
					<td>:</td>
					<td>${dataApi.nabi.umur}</td>
				</tr>
				<tr>
					<td>Tempat</td>
					<td>:</td>
					<td>${dataApi.nabi.tempat}</td>
				</tr>
			
			</table>

	`
	}
	const setContentRight = (dataApi, contentHtml) => {

		const kalimat = dataApi.nabi.kisah;
		const hasilSplit = kalimat.split(".");
		contentHtml.innerHTML = "";

		let j=0;

		for(let i=0; i<Math.ceil(hasilSplit.length/4); i++){
			let gabung = "";
			while(j < (i+1) * 4){
				gabung += hasilSplit[j] + ". ";
				console.log(`nilai j : ${j}`)
				j++;
			}

			contentHtml.innerHTML += `<p>${gabung}</p>`;
		}
	}

	const fetchApi = (query) => {
		return fetch(`https://cors-anywhere.herokuapp.com/kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q=${query}`)
				.then(response => response.json())
				.then(data => data);
	}
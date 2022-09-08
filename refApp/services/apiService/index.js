import config from '../config/index.staging';
// import * as CONST from '../constants/StringConst';
// const expiredTokenObj = {status: 401, message: CONST.TOKEN_EXPIRED_MESSAGE};
// const suspendUserObj = {status: 403, message: CONST.SUSPEND_USER_MESSAGE};

function secureFetch(type, accessToken, body = '') {
	let requestObj = {};
    if (type === 'GET' || type === 'DELETE') {
		requestObj["method"] = type;
		requestObj["headers"] = {
			Authorization: `Token ${accessToken}`
		};
		return requestObj;
	} else {
		requestObj["method"] = type;
		requestObj["headers"] = {
			Authorization: `Token ${accessToken}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		requestObj["body"] = JSON.stringify(body);
		return requestObj;
	}
}

export async function securePost(path, token, body) {
	return await fetch(`${config.baseUrl}/${path}/`, secureFetch('POST', token, body)).then((res) =>{ 
		if(res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) 
			throw (suspendUserObj);
		else
			return res.json();
	});
}

export async function securePut(path, token, body) {
	return await fetch(`${config.baseUrl}/${path}/`, secureFetch('PUT', token, body)).then((res) =>{ 
		if(res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) 
			throw (suspendUserObj);
		else
			return res.json();
	});
}

export async function secureGet(path, token) {
  console.log('@@@ hello ==========', path);
	return await fetch(`${config.baseUrl}/${path}`, secureFetch('GET', token)).then((res) =>{ 
		if(res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) 
			throw (suspendUserObj);
		else
			return res.json();
	});
}

export async function secureDelete(path, token) {
	return await fetch(`${config.baseUrl}/${path}`, secureFetch('DELETE', token)).then((res) =>{ 
		if(res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) 
			throw (suspendUserObj);
		else
			return JSON.parse(JSON.stringify(res));
	});
}

// Multipart
function secureFetchMultiPart(type, accessToken, body = '') {
    let requestObj = {};
    if (type === 'GET' || type === 'DELETE') {
        requestObj["method"] = type;
        requestObj["headers"] = {
            Authorization: `Token ${accessToken}`
        };
        return requestObj;
    } else {
        requestObj["method"] = type;
        requestObj["headers"] = {
            Authorization: `Token ${accessToken}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        };
        requestObj["body"] = body;
        return requestObj;
    }
}

export async function securePostMultiPart(path, token, body) {
    return await fetch(`${config.baseUrl}/${path}/`, secureFetchMultiPart('POST', token, body)).then((res) =>{ 
        if(res.status === 401)
            throw (expiredTokenObj);
        else if (res.status === 403) 
            throw (suspendUserObj);
        else
            return JSON.parse(JSON.stringify(res))
    });
}




/*const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}*/

const formatTime = function(tsp, form = 'Y-m-d H:i:s') {
	tsp = tsp.length == 10 && tsp *1000
	
    var ret = '', dict = {};
	var day = tsp ? new Date(tsp) : new Date();
    
    dict['Y'] = day.getFullYear();
    dict['y'] = parseInt(dict['Y'].toString().substring(2));
    dict['n'] = day.getMonth()+1;
    dict['m'] = (day.getMonth()+1 < 10 ? '0'+(day.getMonth()+1) : day.getMonth()+1);
    dict['d'] = day.getDate();
    dict['j'] = (day.getDate() < 10 ? '0' + (day.getDate()) : day.getDate());
    dict['H'] = (day.getHours() < 10 ? '0' + day.getHours() : day.getHours());
    dict['i'] = (day.getMinutes() <10 ? '0' + day.getMinutes() : day.getMinutes());
    dict['s'] = (day.getSeconds() <10 ? '0' + day.getSeconds() : day.getSeconds());      
    dict['A'] = day.getHours() > 12 ? 'PM':'AM'
    dict['a'] = day.getHours() > 12 ? 'pm':'am'

    if (form == 'auto') {
        form = timestampFormat(null, 'Y-m-d') == dict['Y'] + '-' + dict['m'] + '-' + dict['d'] ? 
            'm-d A': 'Y-m-d';
    }
    for (var i = 0; i < form.length; i++) {
        ret += (dict[form[i]] !== undefined) ? dict[form[i]] : form[i];
    }
    return ret
}

const linkto = url => {
	let stacks = getCurrentPages()
	if (url.indexOf('/') === 0) {
		url = url.substring(1)
	}
	// if (stacks.length == 1) {
	// 	wx.navigateTo({url: `/${url}`})
	// 	return
	// }
	if (stacks.length > 1 && stacks[stacks.length -2].route == url) {
		wx.navigateBack()
		return;
	}
	wx.navigateTo({url: `/${url}`})
}

const parseUrl = url => {
	// console.log(url)
	if (!url) {
		return false
	}
	let seg= url.toString().split('://')
	let protocol
	if (seg.length > 1) {
		protocol = seg[0]
		url = seg[1]
	}else{
		protocol = ''
		url = seg[0]
	}
	seg = url.split('?')
	let host_path = seg[0].split('/')
	let host = host_path[0]
	delete host_path[0]
	let path = host_path.join('/')
	let [query, hash] = seg[1].split('#')

	return {
		protocol: protocol,
		host: host,
		path: path,
		query: query,
		hash: hash
	}
}

const parseQuery = query_str => {
	let query = {}
	query_str.split('&').map((couple) => {
		if (!!couple) {
			let [name, value] = couple.split('=')
			if (!!name) {
				query[name] = decodeURIComponent(value)
			}
		}
	})
	return query
}

const buildQuery = (query_obj, isEncode = true) => {
	let query = []
	Object.keys(query_obj).map((name) => {
		isEncode ? query.push(`${name}=${encodeURIComponent(query_obj[name])}`) : query.push(`${name}=${query_obj[name]}`)
	})
	return query.join('&')
}

const empty = (the) => {
	if (Array.isArray(the)) {
		return the.length == 0
	}
	if (typeof the == 'object') {
		return '{}' == JSON.stringify(the)
	}
	if (the === 0 || the === '') {
		return true
	}
	return false
}

export default {
	formatTime: formatTime,
	linkto: linkto,
	parseUrl: parseUrl,
	parseQuery: parseQuery,
	buildQuery: buildQuery,
	empty: empty
}  

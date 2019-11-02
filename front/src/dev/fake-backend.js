import { endPoints } from "../constants"

// array in local storage for registered users
const storage = sessionStorage

let users = JSON.parse(sessionStorage.getItem('users')) || [];

let stats = JSON.parse(sessionStorage.getItem('stats')) || [];

export default function configureFakeBackend() {
    //let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith(endPoints.USER_AUTH) && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);
                    // find if any user matches login credentials

                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        const responseJson = {body: {...filteredUsers[0]}, header: { 'x-auth-token': filteredUsers[0]._id }};
                        resolve({ ok: true, json: () => Promise.resolve(JSON.stringify(responseJson))} )
                    } else {
                        console.log('email or password incorrect')
                        // else return error
                        reject(new Error('email or password is incorrect'));
                    }

                    return;
                }

                // register user
                if (url.endsWith(endPoints.USER_REGISTER) && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    const duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
                    if (duplicateUser) {
                        reject(new Error('email "' + newUser.email + '" is already taken'));
                        return;
                    }

                    // save new user
                    newUser._id = users.length ? Math.max(...users.map(user => user._id)) + 1 : 1;
                    if (newUser.email === 'wheelly@yandex.ru') {
                        newUser.isAdmin = true
                    } else {
                        newUser.isAdmin = false;
                    }
                    users.push(newUser);
                    storage.setItem('users', JSON.stringify(users));
                    const responseJson = {body: newUser, header: { 'x-auth-token': newUser._id }};
                    resolve({ ok: true, json: () => Promise.resolve(JSON.stringify(responseJson))} )

                    return;
                }

                if (url.endsWith(endPoints.SEARCH_YOUTUBE)) {
                    const responseJson = {body: fakeGoogleRes() }
                    resolve({ ok: true, json: () => Promise.resolve(JSON.stringify(responseJson))} )
                    return;
                }

                if (url.endsWith(endPoints.STATS_WRITE) && opts.method === 'POST') {
                    const newStatRecord = JSON.parse(opts.body);
                    stats.push({...newStatRecord, date: Date.now(), uid: newStatRecord['x-auth-token']})
                    resolve({ ok: true })
                    return;
                }

                if (url.endsWith(endPoints.USER_STATS) ) {

                    const responseJson = stats.map( row => {
                        const user = users[row.uid - 1];
                        const { name, email } = user
                        const { date, searchString, videoId, thumbUrl } = row
                        return { date, name, email, searchString, videoId, thumbUrl }
                    })

                    console.log(`Stats=${responseJson}`)

                    resolve({ ok: true, json: () => Promise.resolve(JSON.stringify(responseJson))} )
                    return;
                }

                reject(new Error('This request "' + url + '" not handled by fake dev backend'))

            }, 500);
        });
    }
}

const fakeGoogleRes = () => {
    return {
        "kind": "youtube#searchListResponse",
        "etag": "\"j6xRRd8dTPVVptg711_CSPADRfg/e5nZbp6-4E2YqsOXDrG5OI1MM0A\"",
        "nextPageToken": "CBQQAA",
        "regionCode": "IL",
        "pageInfo": {
            "totalResults": 407844,
            "resultsPerPage": 20
        },
        "items": [
            {
                "kind": "youtube#searchResult",
                "etag": "\"j6xRRd8dTPVVptg711_CSPADRfg/GzvukMlGrNlQpvturqIUlxMvB_0\"",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "YokXa5tVBzI"
                },
                "snippet": {
                    "publishedAt": "2018-10-19T23:20:49.000Z",
                    "channelId": "UCXGt7134NOG1mgS6Ox7edtw",
                    "title": "ITALIAN COMPREHENSION PRACTICE - parliamo italiano! [Video in Italian]",
                    "description": "Support the stream: https://streamlabs.com/italymadeeasy I know, it's hard to find good content in Italian that is specifically created for learners of the language.",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/YokXa5tVBzI/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/YokXa5tVBzI/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/YokXa5tVBzI/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Italy Made Easy",
                    "liveBroadcastContent": "none"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "\"j6xRRd8dTPVVptg711_CSPADRfg/ssLMizUfakEa0h_mZZS62inTCiI\"",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "lhlz_uadWdM"
                },
                "snippet": {
                    "publishedAt": "2018-12-02T11:23:44.000Z",
                    "channelId": "UChJtl-bJFgQit_BmjL5axtg",
                    "title": "1/4 Capisco l&#39;italiano MA non riesco ANCORA a parlare bene... | Imparare l&#39;italiano",
                    "description": "SCARICA QUA LA CONVERSAZIONE IN REGALO: http://bit.ly/2AIw9nY.",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/lhlz_uadWdM/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/lhlz_uadWdM/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/lhlz_uadWdM/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Impara l'Italiano con Italiano Automatico",
                    "liveBroadcastContent": "none"
                }
            }]
    }
}
// Массив возможных настроений: для каждого настроения указаны
// id
// messages: массив с сообщениями
// tracks: массив с треками (название, исполнитель, обложка, ссылка на трек в Spotify)
export const moods = [
  {
    id: 'nerdy',
    messages: [
      `I'm just tryna glow up, but still playin' like a kid.`,
      'Tolerance fucked up, gotta smoke two or three, huh.',
      'Young nigga do it all, produce, writing, mix, all three.',
      'Fuck the rehab, rather roll good tree.',
      'I got Chrome up on this bitch, expensive leather.',
      'Catch him in the alley, I think that nigga outta luck.',
      `I'm off the bean, I'm laced.`,
      `Talk to NASCAR, I'm a speed demon.`
    ],
    tracks: [
      {
        title: 'Trenches',
        artist: 'OsamaSon',
        cover: 'images/covers/osamason-flex-music.jpg',
        link: 'https://open.spotify.com/track/5zlEkBmLWairpf6lvCYrti?si=b458cbbc6e714a85'
      },
      {
        title: 'stephanie',
        artist: 'Eem Triplin',
        cover: 'images/covers/eem-triplin-stephanie.jpg',
        link: 'https://open.spotify.com/track/3ngowGyxG1ZKzOAfPYqfL1?si=ea9662300006420b'
      },
      {
        title: 'hysteric jeans',
        artist: '5eva',
        cover: 'images/covers/hysteric.jpg',
        link: 'https://open.spotify.com/track/0Go5AfUCvKDk315ru7wV2v?si=61a9d2ca1e094973'
      },
      {
        title: 'MY WORD',
        artist: 'lifelessgarments',
        cover: 'images/covers/my-word.jpg',
        link: 'https://open.spotify.com/track/445HoB9bLv5tQ5nkB2BIL9?si=799b889adf8047a0'
      },
      {
        title: 'Break Da News',
        artist: 'OsamaSon',
        cover: 'images/covers/jump-out.jpg',
        link: 'https://open.spotify.com/track/0g4i6sA9ByfldHKafFMhFp?si=183d804ad0d04650'
      },
      {
        title: 'Mufasa',
        artist: 'OsamaSon',
        cover: 'images/covers/jump-out.jpg',
        link: 'https://open.spotify.com/track/6C4tyupVHPv3CZiBEZ24lr?si=0fcee06b8b6947ef'
      },
      {
        title: 'Light',
        artist: 'prettifun',
        cover: 'images/covers/prettifun-pretti.jpg',
        link: 'https://open.spotify.com/track/4plvJORNWW9LJlJA2wOkkh?si=8b7e03c820174f07'
      },
      {
        title: 'Ice Cream',
        artist: 'prettifun',
        cover: 'images/covers/prettifun-pretti.jpg',
        link: 'https://open.spotify.com/track/7EyP6YhWSXfDsriEUM3mwQ?si=889c8f6d4adb4e16'
      },
      {
        title: 'Touch The Sun',
        artist: 'prettifun',
        cover: 'images/covers/prettifun-pretti.jpg',
        link: 'https://open.spotify.com/track/2NFoCl74eoz18HVdl2pJSq?si=66356e50af8f4955'
      },
      {
        title: 'Where You At?',
        artist: '1oneam',
        cover: 'images/covers/onelife.jpg',
        link: 'https://open.spotify.com/track/63wUH3jxccKhhGqGfgOF3X?si=1fbc2c4ca5154555'
      },
      {
        title: 'Her',
        artist: 'Tdf, Che',
        cover: 'images/covers/tdf-blueprint.jpg',
        link: 'https://open.spotify.com/track/4GNd7KTUx4LewNIj6oUyVA?si=bd704365df364ece'
      },
      {
        title: 'Late Night Drinks',
        artist: 'Tdf, Okaymar, 1oneam',
        cover: 'images/covers/tdf-culture.jpg',
        link: 'https://open.spotify.com/track/6tOrHANJ0toOKEcmanJ4WE?si=7b72ebabec964ab6'
      },
      {
        title: 'Sean Kingston',
        artist: 'Tdf, Okaymar',
        cover: 'images/covers/tdf-blueprint.jpg',
        link: 'https://open.spotify.com/track/3IuVBN8XbV6kxILZXJQzcy?si=3ba0f30626f04a79'
      },
      {
        title: 'footjob',
        artist: 'Geologyshi',
        cover: 'images/covers/footjob.jpg',
        link: 'https://open.spotify.com/track/5hz5fDbdjPih10bVKrw4c8?si=4fdb65051d95419e'
      },
      {
        title: 'BA$$',
        artist: 'Che',
        cover: 'images/covers/rest-in-bass.jpg',
        link: 'https://open.spotify.com/track/51OiK90giWwDI0RedEYBcg?si=8eea18c9963d433a'
      },
      {
        title: 'DIOR LEOPARD',
        artist: 'Che',
        cover: 'images/covers/rest-in-bass.jpg',
        link: 'https://open.spotify.com/track/7kQSYTf3fA2DYl4NbTzSzS?si=84baf02423eb4bfe'
      },
      {
        title: 'AWKWARD FREESTYLE',
        artist: 'Eem Triplin',
        cover: 'images/covers/awkward.jpg',
        link: 'https://open.spotify.com/track/5covx4W77ZCuXI0ejgoZh0?si=60f84710a9294509'
      },
      {
        title: 'Psychboost',
        artist: 'Jane Remover, Danny Brown',
        cover: 'images/covers/remover.jpg',
        link: 'https://open.spotify.com/track/7BMSBNctr9IPelr6MFvuRL?si=e785989905974b39'
      },
      {
        title: 'Sexual Fantasies',
        artist: 'maxon, Percaso',
        cover: 'images/covers/maxon.jpg',
        link: 'https://open.spotify.com/track/7oK2oiwaLzB9IE9wdSRsoJ?si=e08efbea15cd4485'
      },
      {
        title: 'Pizza Time',
        artist: 'Che',
        cover: 'images/covers/pizzatime.jpg',
        link: 'https://open.spotify.com/track/3pxg2vxImneIXH7Kt4raVM?si=74cb6d6ac54f40b5'
      }
    ]
  },
  {
    id: 'peaceful',
    messages: [
      'It is only with the heart that one can see rightly. What is essential is invisible to the eye.',
      'All shall be well, and all shall be well, and all manner of thing shall be well.',
      'I see trees of green. Red roses too. I see them bloom. For me and you. And I think to myself. What a wonderful world.',
      'I loved you: and perhaps I love you still.',
      'The most important time is now.',
      'We are all in the gutter, but some of us are looking at the stars.',
      `Don't fight the darkness. Don't even worry about the darkness. Turn on the light and the darkness goes.`
    ],
    tracks: [
      {
        title: 'drive ME crazy!',
        artist: 'Lil Yachty',
        cover: 'images/covers/drive.jpg',
        link: 'https://open.spotify.com/track/6luBKkFUt5wTwz7hpLhp12?si=a4a88d6bc5a34aab'
      },
      {
        title: '@ MEH',
        artist: 'Playboi Carti',
        cover: 'images/covers/meh.jpg',
        link: 'https://open.spotify.com/track/5UusfWUMMLEXLMc1ViNZoe?si=1aab862b165b4402'
      },
      {
        title: 'Piano Concerto No. 21',
        artist: 'Wolfgang Amadeus Mozart',
        cover: 'images/covers/mozart.jpg',
        link: 'https://open.spotify.com/track/2ymiJPCDEknHRbIzEze0Dd?si=28afc85185714974'
      },
      {
        title: 'WE NEED ALL DA VIBES',
        artist: 'Playboi Carti, Young Thug, Ty Dolla $ign',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/4XcZp2xqbiD8YsnPboNUDo?si=5805bdb8a3f6443a'
      },
      {
        title: 'RATHER LIE',
        artist: 'Playboi Carti, The Weekend',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/68qeaZhtMZ6abrJCYt6nQn?si=20a160b6a8514ddf'
      },
      {
        title: 'LIKE WEEZY',
        artist: 'Playboi Carti',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/4zK082ykqJzJGzC64NXjp1?si=928774f3a08e4817'
      },
      {
        title: 'Get Right',
        artist: 'Okaymar',
        cover: 'images/covers/getright.jpg',
        link: 'https://open.spotify.com/track/2HpXBYeiX0sjgb6zbpVt5K?si=03ff9a649cd64d78'
      },
      {
        title: 'VTMNTS',
        artist: 'tana',
        cover: 'images/covers/bana.jpg',
        link: 'https://open.spotify.com/track/4Rsdf9jpMj8LyFV4hgm4RF?si=296f342233f2441d'
      },
      {
        title: 'Southside',
        artist: 'Sk8star',
        cover: 'images/covers/southside.jpg',
        link: 'https://open.spotify.com/track/3Vc5i8SaujfHETad7zBBJn?si=d302d7438de748dd'
      },
      {
        title: 'OnTheWay',
        artist: 'Diorvsyou, Sk8star',
        cover: 'images/covers/ontheway.jpg',
        link: 'https://open.spotify.com/track/50hVsBOW6qsiXfGNIqD1bD?si=adb537649a2d4203'
      },
      {
        title: 'F33l Lik3 Dyin',
        artist: 'Playboi Carti',
        cover: 'images/covers/wlr.jpg',
        link: 'https://open.spotify.com/track/1xVVYE1ahLotRpppJViVzs?si=6e46a657b84142e6'
      },
      {
        title: 'wokeuplikethis*',
        artist: 'Playboi Carti, Lil Uzi Vert',
        cover: 'images/covers/carti.jpg',
        link: 'https://open.spotify.com/track/59J5nzL1KniFHnU120dQzt?si=9ab3cd23f2234821'
      },
      {
        title: 'Hier encore',
        artist: 'Charles Aznavour',
        cover: 'images/covers/aznavour.jpg',
        link: 'https://open.spotify.com/track/66TDFKCZpMRfLcgJpa15xq?si=e7f7a5b03120475a'
      },
      {
        title: 'Where Was You At?',
        artist: 'Sxnto, untiljapan',
        cover: 'images/covers/sxnto.jpg',
        link: 'https://open.spotify.com/track/5AKjCh4YrcAUnNB4WAyR2G?si=915796e7df4c4251'
      },
      {
        title: 'Death of Me',
        artist: '1oneam',
        cover: 'images/covers/deathofme.jpg',
        link: 'https://open.spotify.com/track/610x7iZSTZh6hsDEKvCBTr?si=3810cb65fbfd4def'
      },
      {
        title: 'Sstuck',
        artist: 'Tdf, Yhapojj',
        cover: 'images/covers/sstuck.jpg',
        link: 'https://open.spotify.com/track/7E6M9RJpQHJS5aMFieQImr?si=63d49b8101d44f83'
      },
      {
        title: 'So FN',
        artist: 'Nine Vicious',
        cover: 'images/covers/sofn.jpg',
        link: 'https://open.spotify.com/track/71HHbXQNXtShANLMe9Mwqu?si=17a09a0d4d364bcd'
      },
      {
        title: `Can't Tell Me Nothing`,
        artist: 'Nine Vicious',
        cover: 'images/covers/canttellme.jpg',
        link: 'https://open.spotify.com/track/10klyZeLAJqhzaGhko0ptg?si=4e2094c0cef54ddd'
      },
      {
        title: 'Инкассатор',
        artist: 'ROCKET',
        cover: 'images/covers/rocket.jpg',
        link: 'https://open.spotify.com/track/4DcMqvjv5pcYVu9jTBhpDH?si=20283d2932e043c3'
      },
      {
        title: 'What A Wonderful World',
        artist: 'Louis Armstrong',
        cover: 'images/covers/armstrong.jpg',
        link: 'https://open.spotify.com/track/29U7stRjqHU6rMiS8BfaI9?si=a62285cc4cef4284'
      }
    ]
  },
  {
    id: 'excited',
    messages: [
      'Live as if you were to die tomorrow. Learn as if you were to live forever.',
      'Throw your dreams into space like a kite, and you do not know what it will bring back.',
      'Life is either a daring adventure or nothing at all.',
      'And those who were seen dancing were thought to be insane by those who could not hear the music.',
      `When you're smiling, the whole world smiles with you.`,
      'The world is full of magic things, patiently waiting for our senses to grow sharper.',
      `It's a psychoactive trip that I would prefer not to spoil…`,
      `Can't stop, won't stop`,
      'This is our moment.',

    ],
    tracks: [
      {
        title: 'queen',
        artist: 'Iris',
        cover: 'images/covers/iris.jpg',
        link: 'https://open.spotify.com/track/3xKCgZohgLTMye0N8ljyFc?si=16fcd690b0024f75'
      },
      {
        title: 'Бассок',
        artist: 'Платина, Voskresenskii',
        cover: 'images/covers/platina.jpg',
        link: 'https://open.spotify.com/track/4YxRxVKi7IYUOR5p7nsYcp?si=5b081811f19e451b'
      },
      {
        title: 'x2',
        artist: 'Lil Uzi Vert',
        cover: 'images/covers/pinktape.jpg',
        link: 'https://open.spotify.com/track/3a36nM6fPVA8K1vqq6d03o?si=65c2b7d3560b4870'
      },
      {
        title: `What's the Move`,
        artist: 'Young Thug, Lil Uzi Vert',
        cover: 'images/covers/thug.jpg',
        link: 'https://open.spotify.com/track/3pTScODwk9tggZzmuH6xDY?si=5c5ab24180f34bf4'
      },
      {
        title: 'Bad Bad Bad',
        artist: 'Young Thug, Lil Baby',
        cover: 'images/covers/thug.jpg',
        link: 'https://open.spotify.com/track/1GeNui6m825V8jP4uKiIaH?si=95891a57aaea4cb2'
      },
      {
        title: 'Slay3r',
        artist: 'Playboi Carti',
        cover: 'images/covers/wlr.jpg',
        link: 'https://open.spotify.com/track/1eMNW1HQjF1dbb4GtnmpaX?si=3ea479ce4864406c'
      },
      {
        title: 'Vogue',
        artist: '1oneam',
        cover: 'images/covers/vogue.jpg',
        link: 'https://open.spotify.com/track/3VPvbDjR0UOekMVCYa22iF?si=2f765c5d25db46dd'
      },
      {
        title: 'light ice',
        artist: 'Sk8star, untiljapan, tana',
        cover: 'images/covers/lightice.jpg',
        link: 'https://open.spotify.com/track/23BAhrID1HUEpu8ZuISBaT?si=c738cc62581947d3'
      },
      {
        title: 'Got The Guap',
        artist: 'Lil Uzi Vert, Young Thug',
        cover: 'images/covers/uzik.jpg',
        link: 'https://open.spotify.com/track/1HF6P40Z7nfExGaB1Gk99v?si=fefa254a938a4a5b'
      },
      {
        title: 'Overwhelming',
        artist: 'Matt OX',
        cover: 'images/covers/mattox.jpg',
        link: 'https://open.spotify.com/track/1NJhYKiPXjTlNnFtboG2d9?si=db234400af304378'
      },
      {
        title: 'Walk Down',
        artist: 'Sk8star',
        cover: 'images/covers/walk.jpg',
        link: 'https://open.spotify.com/track/4an0FBbJpxjcIo5GKypzOR?si=033992cba24240ed'
      },
      {
        title: 'first class',
        artist: 'Sk8star',
        cover: 'images/covers/mogul.jpg',
        link: 'https://open.spotify.com/track/3bRDQbygdMwa7HXw5Xhu2K?si=f4c763156f9c4f23'
      },
      {
        title: 'Kids from the west',
        artist: 'Feng',
        cover: 'images/covers/feng.jpg',
        link: 'https://open.spotify.com/track/29NufkWdbrr3m9OOF9haNK?si=da9c4bd50cf34b77'
      },
      {
        title: 'Bless Up',
        artist: '1oneam',
        cover: 'images/covers/onelife.jpg',
        link: 'https://open.spotify.com/track/6evM0cVBkbpmD4ZCuLXauX?si=e12f41a164484113'
      },
      {
        title: 'Kisses',
        artist: 'prettifun',
        cover: 'images/covers/pretti-delux.jpg',
        link: 'https://open.spotify.com/track/7yifQlfj0J369A3BNBFL9g?si=3cb747ef4b4d4533'
      },
      {
        title: 'Myron',
        artist: 'Lil Uzi Vert',
        cover: 'images/covers/uzik.jpg',
        link: 'https://open.spotify.com/track/56uXDJRCuoS7abX3SkzHKQ?si=ea4774b587f04e4c'
      },
      {
        title: 'MANNEQUIN',
        artist: 'Che, xaviersobased',
        cover: 'images/covers/rest-in-bass.jpg',
        link: 'https://open.spotify.com/track/4BOZwlrJLGTPmePx9mM9pu?si=7bd20f2ac1804983'
      },
      {
        title: 'Magnolia',
        artist: 'Playboi Carti',
        cover: 'images/covers/carti.jpg',
        link: 'https://open.spotify.com/track/1e1JKLEDKP7hEQzJfNAgPl?si=510488b9af9e4944'
      },
      {
        title: '9am in Calabasas',
        artist: 'Adrian',
        cover: 'images/covers/9am.jpg',
        link: 'https://open.spotify.com/track/1cnywZiOldWgUfxAtJekLM?si=6862f0bd17aa47d0'
      },
      {
        title: 'Waterfall',
        artist: 'Adrian',
        cover: 'images/covers/adrian-waterfall.jpg',
        link: 'https://open.spotify.com/track/4Yevg7K6cDlQrDLx0Uo1zq?si=87119383637842ad'
      }
    ]
  },
  {
    id: 'mischievous',
    messages: [
      `I been rockin', I been ravin', I been ragin'.`,
      'The rage feels genuine.',
      'I rock and I roll, I rage and they cheer.',
      'Better to reign in Hell than serve in Heaven.',
      'The road to hell is paved with good intentions.',
      'The devil is not as black as he is painted.',
      'The world is full of such marvels that it is better to stand amazed than to judge.'
    ],
    tracks: [
      {
        title: 'THRILL',
        artist: 'Destroy Lonely, Ken Carson',
        cover: 'images/covers/dirt.jpg',
        link: 'https://open.spotify.com/track/3FMKkmAXsCrJM9ZDIbQejN?si=3cd23befa87c4df4'
      },
      {
        title: 'Nun id change',
        artist: 'Yeat',
        cover: 'images/covers/yeat.jpg',
        link: 'https://open.spotify.com/track/00zk0uua6s2ifh0Nc3ppfW?si=46baa2989f1244d3'
      },
      {
        title: 'ss',
        artist: 'Ken Carson',
        cover: 'images/covers/ss.jpg',
        link: 'https://open.spotify.com/track/26QJuQfM8PVAWkIm1JRyqq?si=ed343498aec648a8'
      },
      {
        title: 'Flight of the Bumblebee',
        artist: 'Nikolai Rimsky-Korsakov',
        cover: 'images/covers/bumblebee.jpg',
        link: 'https://open.spotify.com/track/0nF5aQoLs2YtbWwClXvumL?si=91afb2d68d5d4993'
      },
      {
        title: 'TOXIC',
        artist: 'Playboi Carti, Skepta',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/4evMMKc2HD6fV9slMfgkMx?si=bd1a2a9fc53f4ee9'
      },
      {
        title: 'COCAINE NOSE',
        artist: 'Playboi Carti',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/4rXxjHSAglOynjIF8Z34dx?si=927b195282084605'
      },
      {
        title: 'Take the risk',
        artist: 'echstacy',
        cover: 'images/covers/echstacy.jpg',
        link: 'https://open.spotify.com/track/6812ctxlFzEqdnqjwvn19o?si=31665a62b04d48ad'
      },
      {
        title: 'Trap Jump',
        artist: 'Ken Carson',
        cover: 'images/covers/chaos.jpg',
        link: 'https://open.spotify.com/track/7wWFfIDUVMHKsqdhqa6QD8?si=4bafd4ab0bef46f5'
      },
      {
        title: 'PB&J',
        artist: 'Homixide Gang, Ken Carson',
        cover: 'images/covers/home.jpg',
        link: 'https://open.spotify.com/track/1uJiHxYj2jMgbSTNiuf6zV?si=e91b6af274604fa4'
      },
      {
        title: 'SHOPPING BAGS',
        artist: 'Homixide Gang, Destroy Lonely',
        cover: 'images/covers/home.jpg',
        link: 'https://open.spotify.com/track/6HStf7721bXOr2zx4nHh08?si=7f9a8e68370a4601'
      },
       {
        title: 'CRYSTAL CLEAR',
        artist: 'Destroy Lonely',
        cover: 'images/covers/dirt.jpg',
        link: 'https://open.spotify.com/track/1IpubUlcUN6NAW4p1s2XkL?si=191799ed509c4b7c'
      },
      {
        title: 'Walk in the park',
        artist: 'Feng',
        cover: 'images/covers/park.jpg',
        link: 'https://open.spotify.com/track/2vk4jSuHrVuvmFjrlz5yJ5?si=e8c2554be224455c'
      },
      {
        title: 'agenda',
        artist: 'Che',
        cover: 'images/covers/agenda.jpg',
        link: 'https://open.spotify.com/track/6B6VIuSzdsmk1BTgtPhFQD?si=e9972c1e56184e4d'
      },
      {
        title: 'lotta time',
        artist: '1oneam',
        cover: 'images/covers/lotta.jpg',
        link: 'https://open.spotify.com/track/0oPDpIl0ZCDbAqIwiCrvAg?si=febdc29102844296'
      },
      {
        title: 'Vamp Anthem',
        artist: 'Playboi Carti',
        cover: 'images/covers/wlr.jpg',
        link: 'https://open.spotify.com/track/4CzhtKifG867Lu5DNQVBSA?si=c59eea3c7f664a85'
      },
      {
        title: 'Stop Breathing',
        artist: 'Playboi Carti',
        cover: 'images/covers/wlr.jpg',
        link: 'https://open.spotify.com/track/2lLG56qpLP3UbcLuzMvkWX?si=edc8331a57864472'
      },
      {
        title: 'Rockstar Made',
        artist: 'Playboi Carti',
        cover: 'images/covers/wlr.jpg',
        link: 'https://open.spotify.com/track/3cWmqvMwVQKDigWLSZ3w9h?si=7ca0ceeb6f3b4600'
      },
      {
        title: 'Pull Up',
        artist: 'Playboi Carti',
        cover: 'images/covers/pullup.jpg',
        link: 'https://open.spotify.com/track/424qpX6swdUdhLq95cecNu?si=f4dc7d4cb3b4499b'
      },
      {
        title: 'Walk',
        artist: 'Pantera',
        cover: 'images/covers/pantera.jpg',
        link: 'https://open.spotify.com/track/7fcfNW0XxTWlwVlftzfDOR?si=857368ad2b68440f'
      },
      {
        title: 'Blakk Rokkstar',
        artist: 'Ken Carson',
        cover: 'images/covers/chaos.jpg',
        link: 'https://open.spotify.com/track/1LsisG6aoqfsF1r6M4LpMO?si=bf3abb7fad184f5d'
      }
    ]
  },
  {
    id: 'despaired',
    messages: [
      'The wound is the place where the light enters you.',
      'Even the darkest night will end and the sun will rise.',
      'Every man has his secret sorrows which the world knows not.',
      'Although the world is full of suffering, it is also full of the overcoming of it.',
      'Do not be afraid of sadness, for it shows you have lived deeply.',
      'Behind every sweet smile, there is a bitter sadness that no one can see and no one can understand.',
      `When you're kicked down and broken, there's only up to go. You get reborn, free from expectations. It's beautiful down there.`,
      'We shall rest, brothers. We shall rest.',
      `Yes, there were times, I'm sure you knew, when I bit off more than I could chew.`,
      'And now, as tears subside, I find it all so amusing.',
      'All the shit I deal with, I got scars'
    ],
    tracks: [
      {
        title: 'brazy girls',
        artist: 'Destroy Lonely',
        cover: 'images/covers/brazy.jpg',
        link: 'https://open.spotify.com/track/0OVLwmkhKi970zNb8xff4W?si=5f7cfddc3df34fa9'
      },
      {
        title: 'how u feel?',
        artist: 'Destroy Lonely',
        cover: 'images/covers/brazy.jpg',
        link: 'https://open.spotify.com/track/5BsigwhOMHxCkF6ntEhUQ5?si=e6a8506175a84d33'
      },
      {
        title: 'Tunevert',
        artist: 'LUCKI',
        cover: 'images/covers/lukipink.jpg',
        link: 'https://open.spotify.com/track/7sHTyXq2wK6hpCi79KlzbC?si=9cb9c0b5dfcf46a1'
      },
      {
        title: 'Protect Mine',
        artist: 'KYSLINGO',
        cover: 'images/covers/kys.jpg',
        link: 'https://open.spotify.com/track/4CbPi3OJG0oUFRKruKPBOP?si=d407aed4e07249a2'
      },
      {
        title: 'Один дома',
        artist: 'Платина',
        cover: 'images/covers/platina.jpg',
        link: 'https://open.spotify.com/track/0ftlnPZVePcubevtnqO4k3?si=b8ec04e7d8f14695'
      },
      {
        title: 'Dover Street Market',
        artist: 'Destroy Lonely',
        cover: 'images/covers/dover.jpg',
        link: 'https://open.spotify.com/track/4ynCMuUKH4btdbX9K9Z4zR?si=245ebb928cf144c0'
      },
      {
        title: 'say so',
        artist: 'Sk8star',
        cover: 'images/covers/lightice.jpg',
        link: 'https://open.spotify.com/track/6PxMrtKPoeb0rGmDCeORF7?si=7460066a609c4c38'
      },
      {
        title: 'hermés',
        artist: 'Sk8star',
        cover: 'images/covers/lightice.jpg',
        link: 'https://open.spotify.com/track/54BwREmZ5VZkLtsSAqxEm0?si=a0345b0332304443'
      },
      {
        title: 'Left for USA',
        artist: 'Feng',
        cover: 'images/covers/feng.jpg',
        link: 'https://open.spotify.com/track/6rRk5ExVeKu5nnf6VD5pst?si=4f3b7b3da07b4d67'
      },
      {
        title: 'Benz Truck (гелик)',
        artist: 'Lil Peep',
        cover: 'images/covers/peep.jpg',
        link: 'https://open.spotify.com/track/0E9kGKtSm8btX8qPUvIsyT?si=ae4d474450dc40e6'
      },
      {
        title: 'RIP',
        artist: 'LUCKI',
        cover: 'images/covers/rip.jpg',
        link: 'https://open.spotify.com/track/0iBV6djrudVllSHVTSAJbB?si=e9424a42458349af'
      },
      {
        title: 'Princess',
        artist: 'Feng',
        cover: 'images/covers/princess.jpg',
        link: 'https://open.spotify.com/track/7JocUOXTz0waZlhdhnTd0G?si=f8c40228624e4347'
      },
      {
        title: 'Metamorphosis',
        artist: 'Feng',
        cover: 'images/covers/meta.jpg',
        link: 'https://open.spotify.com/track/7rFQTb3Hnuw54npadwqhLs?si=120306e5f9304f7b'
      },
      {
        title: 'Teenage dreamer',
        artist: 'Feng',
        cover: 'images/covers/vans.jpg',
        link: 'https://open.spotify.com/track/2NMAQs3JdA5wAlS9zc3Vu0?si=fcc233f9f2244ae0'
      },
      {
        title: 'Infinite Tsukuyomi',
        artist: 'ROCKET',
        cover: 'images/covers/tsuk.jpg',
        link: 'https://open.spotify.com/track/1w6yKhAgRhIaZhsWEay2H3?si=eac75e942c6b49f8'
      },
      {
        title: 'promises',
        artist: 'Hardrock',
        cover: 'images/covers/rock.jpg',
        link: 'https://open.spotify.com/track/4bYOJrnVH6wS39xKaY6UEn?si=65eae74b68c64987'
      },
      {
        title: 'Wasted',
        artist: 'Juice WRLD, Lil Uzi Vert',
        cover: 'images/covers/juice.jpg',
        link: 'https://open.spotify.com/track/1a7WZZZH7LzyvorhpOJFTe?si=05f931ac74b54e0a'
      },
      {
        title: 'place',
        artist: 'Destroy Lonely',
        cover: 'images/covers/horse.jpg',
        link: 'https://open.spotify.com/track/2NO6WGB2XO4g5xdqNKPNph?si=acc1d3a15ffb4359'
      },
      {
        title: 'trapped on marz',
        artist: 'Destroy Lonely, Nezzus',
        cover: 'images/covers/horse.jpg',
        link: 'https://open.spotify.com/track/5Ah5TnEZO19f8kzjFY19MG?si=af1286718d1846c7'
      }
    ]
  },
  {
    id: 'naughty',
    messages: [
      `Sippin' on something I can't even name...`,
      `Smokin' something I can't even name...`,
      'And those who were seen dancing were thought to be insane by those who could not hear the music.',
      'Life is either a daring adventure or nothing at all.',
      'One must still have chaos in oneself to be able to give birth to a dancing star.',
      'Let the world know you as you are, not as you think you should be.',
      `Follow your inner moonlight, don't hide the madness.`
    ],
    tracks: [
      {
        title: 'JETLGGD',
        artist: 'Destroy Lonely',
        cover: 'images/covers/style.jpg',
        link: 'https://open.spotify.com/track/730Sd7tP4eRKvPhQceOPYn?si=23a5fb33ba3d4103'
      },
      {
        title: 'Off The Meter',
        artist: 'Ken Carson, Playboi Carti, Destroy Lonely',
        cover: 'images/covers/chaos.jpg',
        link: 'https://open.spotify.com/track/2Y98lEkMVALCXni7o2g28b?si=02a1eab2d5a244c5'
      },
      {
        title: 'Like This',
        artist: 'Ken Carson, Lil Uzi Vert, Destroy Lonely',
        cover: 'images/covers/ss.jpg',
        link: 'https://open.spotify.com/track/1DypGkTryeH4cPFBVucxo4?si=edef4b5dcfbe4746'
      },
      {
        title: 'Blum - Big City Life',
        artist: '9mice, Kai Angel',
        cover: 'images/covers/heavy.jpg',
        link: 'https://open.spotify.com/track/47Mdp52cM7pGwm5FmQcMPD?si=d608221f65604dee'
      },
      {
        title: '*** TRIVIAL',
        artist: 'Kai Angel, 9mice',
        cover: 'images/covers/trivial.jpg',
        link: 'https://open.spotify.com/track/1FScXoUim4LEt0XbyepGqX?si=6b3a1fb30a284fae'
      },
      {
        title: 'FINE SHIT',
        artist: 'Playboi Carti',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/79mFFAOYcG8ZF6AN1JecAL?si=93f5d1c80997422f'
      },
      {
        title: 'Party All Day',
        artist: 'Ken Carson',
        cover: 'images/covers/xxx.jpg',
        link: 'https://open.spotify.com/track/6ttxObu3D64nLg3aL44tpK?si=d45318d275dc4232'
      },
      {
        title: 'Burnin Up',
        artist: 'Ken Carson',
        cover: 'images/covers/xxx.jpg',
        link: 'https://open.spotify.com/track/6GOtK8sx77UL2Gy8KgLtWv?si=943714aa8cc548aa'
      },
      {
        title: 'succubus',
        artist: 'rizza',
        cover: 'images/covers/rizza.jpg',
        link: 'https://open.spotify.com/track/0MYx5qj6I4F1VUf5BOJKu0?si=44dd44eab386403f'
      },
      {
        title: 'FOMDJ',
        artist: 'Playboi Carti',
        cover: 'images/covers/music.jpg',
        link: 'https://open.spotify.com/track/7bO7a1KrtmGNDIOy2u3siZ?si=186899baf3b74940'
      },
      {
        title: 'EU SWAG',
        artist: 'untiljapan',
        cover: 'images/covers/untiljapan.jpg',
        link: 'https://open.spotify.com/track/0r1930reasxsK7CeC4Cwb5?si=4db840607790410a'
      },
      {
        title: 'Face Tattoos',
        artist: 'ApolloRed1',
        cover: 'images/covers/apollo.jpg',
        link: 'https://open.spotify.com/track/6Kr8BojCK20qjxLW5BNEjX?si=ec8f39a4d5544aa4'
      },
      {
        title: 'FountaineBleau',
        artist: 'Diorvsyou',
        cover: 'images/covers/ontheway.jpg',
        link: 'https://open.spotify.com/track/4B0B4HRJO1f1sa2PkN0vQd?si=57c7d4d235c84143'
      },
      {
        title: 'New N3on',
        artist: 'Playboi Carti',
        cover: 'images/covers/wlr.jpg',
        link: 'https://open.spotify.com/track/7ejepEh5DJ79YI6owGRfkk?si=d346f860d28b4d29'
      },
      {
        title: 'Long Time - Intro',
        artist: 'Playboi Carti',
        cover: 'images/covers/pullup.jpg',
        link: 'https://open.spotify.com/track/4IO2X2YoXoUMv0M2rwomLC?si=088fb3aaa10347e9'
      },
      {
        title: 'NOSTYLIST',
        artist: 'Destroy Lonely',
        cover: 'images/covers/style.jpg',
        link: 'https://open.spotify.com/track/0MXemkrh7WpAfiafcGQwZO?si=59ca1c833b894247'
      },
      {
        title: 'Butterfly',
        artist: 'Ken Carson',
        cover: 'images/covers/perc.jpg',
        link: 'https://open.spotify.com/track/63SYg8jjwfAiipZnnICfHc?si=5bde3e1ef7684e65'
      },
      {
        title: 'by the pound',
        artist: 'Destroy Lonely',
        cover: 'images/covers/brazy.jpg',
        link: 'https://open.spotify.com/track/2dWRDq2oH7HIZ3j8cxoK82?si=d940ef9b0c964a3c'
      },
      {
        title: 'Бетховен',
        artist: 'Платина, Scally Milano',
        cover: 'images/covers/platina.jpg',
        link: 'https://open.spotify.com/track/6uK4mB7y8JHa87NuYxl3lQ?si=5c862a4767ba40c7'
      },
      {
        title: 'Teen X Babe',
        artist: 'Ken Carson',
        cover: 'images/covers/perc.jpg',
        link: 'https://open.spotify.com/track/1HYOCC0xTD7ym5oOmP5AKz?si=166fabb215c940d6'
      }
    ]
  }
]
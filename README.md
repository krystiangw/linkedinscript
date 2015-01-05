### LinkedIn profile infos scrapper script in node.
======================

## Requirements

###  1. You need Node.js
```
brew install node
```

###  2. install phantom js globally
```
npm install phantomjs -g
```
###  3. Clone repository
```
git clone git@github.com:krystiangw/linkedinscript.git
```
### 4 Install node dependiences
```
cd linkedinscript
npm install
```

## Using
###  1. Set your linkedin user email and password in confg file.
###  2. Use 'node' to run. Be sure to set env vaiables: EMAIL and PASSWORD for your linkedin account. 
As arguments it accepts list of links to linkedin profiles. Eg:
```
EMAIL='your@email.com' PASSWORD='secret' node linkedinscript.js 'https://www.linkedin.com/in/treygriffith' 'https://www.linkedin.com/profile/view?id=14484635&authType=name&authToken=0-26&trk=prof-sb-browse_map-name'
```

###  3. Get response as json from stout. Example:
```
{
   "name":"linkedin_logs",
   "hostname":"krystians-mbp",
   "pid":76889,
   "level":30,

   "companyName":"Teleborder",
   "fullName":"Trey Griffith",
   "jobTitle":"VP of Technology at Teleborder",
   "results":"OK",

   "msg":"",
   "time":"2015-01-05T08:57:14.296Z",
   "v":0
}
```

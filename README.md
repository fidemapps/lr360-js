# lr360-js
Node module to access Lune Rouge 360 API.

### How to use

Include the following script snippet in your website:

```javascript
<script type="application/javascript">
    !function(e,n,t,r,s){e[s]=e[s]||function(){(e[s].queue=e[s].queue||[]).push(arguments)},e[s].l=1*new Date;var u=n.createElement(t),a=n.getElementsByTagName(t)[0];u.async=1,u.src=r,a.parentNode.insertBefore(u,a)}(window,document,"script"//cdn.lr360.io/api/lr360.js","lr360");

    lr360('setup', {key: 'XXXXX'}); // API access key
    lr360('identifyMember', {email: 'XXXXX'}); // email, memberId or externalId
</script>
```

# API

Parameters inside brackets `[...]` are optional.
Callbacks follow node convention `callback(error, response) { ... }`

### lr360('setup', options:object);

Client configuration. It should be the first command called after script is loaded. The following options are supported:

* `key:string` ( **mandatory** ) your API access key
* `dev:true|false` working environment. If true the library will throw errors, if false it will log them in the console

### lr360('identifyMember', options:object, [callback]);

Member lookup. If found, binds the current session to that member (useful to action tracking). One of the following 3 options **must be provided**:

* `memberId:string` 
* `email:string` 
* `externalId:string` 

### lr360('clearMember', \[callback\]);

Unbinds the current session to the member.

### lr360('trackAction', type:string, [callback]);

Track an action.

### lr360('trackAction', options:object, \[callback\]);

Track an action. The following options are supported:

* `type:string` ( **mandatory** )the action type  
* `[data:object]` any additional information you would like to save with the action 

### lr360('trackAction', type:string, options:object, \[callback\]);

Track an action. The following options are supported:

* `[data:object]` any additional information you would like to save with the action 

### lr360('getMemberProfile', \[options:object\], callback);

Load a member profile. The following options is supported:

* `memberId:string` 

If options object is not provided, the profile loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getDeviceProfile', \[options:object\], callback);

Load a device profile. The following option is supported:

* `deviceId:string` 

If options object is not provided, the profile loaded will belong to the current session's device.

### lr360('getMemberChallenges', \[options:object\], callback);

Load member's challenges. The following option is supported:

* `memberId:string` 

If options object is not provided, the challenges loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getMemberChallengesDone', \[options:object\], callback);

Load member's done challenges. The following option is supported:

* `memberId:string` 

If options object is not provided, the challenges loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getMemberChallengesTodo', \[options\], callback);

Load member's challenges to do. The following option is supported:

* `memberId:string` 

If options object is not provided, the challenges loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getMenus', \[options:object\], callback);

Load all menus available to member. The following option is supported:

* `memberId:string` 

If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public menus will be loaded.

### lr360('getPages', options:object, callback);

Load page contents available to member. The following options are supported:

* `pageId:string`
* `[memberId:string]`

If no memberId in options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public pages will be loaded.

### lr360('getNews', options:object, callback);

Load news available to member. The following options are supported:

* `newsListId:string`
* `[memberId:string]`

If no memberId in options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public news will be loaded.

### lr360('getContests', \[options:object\], callback);

Load all contests available to member. The following option is supported:

* `memberId:string` 

If no memberId in options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public contests will be loaded.


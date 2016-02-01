# lr360-js
Node module to access Lune Rouge 360 API.

## Usage

Include the following script in your website:

```javascript
<script type="application/javascript">
    !function(e,n,t,r,s){e[s]=e[s]||function(){(e[s].queue=e[s].queue||[]).push(arguments)},e[s].l=1*new Date;var u=n.createElement(t),a=n.getElementsByTagName(t)[0];u.async=1,u.src=r,a.parentNode.insertBefore(u,a)}(window,document,"script","lr360.js","lr360");

    lr360('setup', {key: 'XXXXX'});
    lr360('trackAction', {type: 'click'});
</script>
```

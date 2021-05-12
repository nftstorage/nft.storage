# Example to repoduce the issue

This is reproducible test case that illustrates timeout problem reported when uploading to nft.storage.

You can run it against https://nft.storage by executing

```
API_KEY=<YOUR_API_KEY> python main.py
```

And unless it was fixed, it will print output like:

```
{u'ok': False, u'error': {u'message': u'Network connection lost.', u'code': u'Error'}}
```

To run it against your own dev environment, you can pass API endpoint URL via env variable by executing (use your own URL for API_URL)

```
API_HOST=https://33ed172d4666.ngrok.io/upload API_URL=https://33ed172d4666.ngrok.io/upload python main.py
```


### Notes

If you switch the order of filse it will succeed.

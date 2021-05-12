# Example to repoduce the issue

This is reproducible test case that illustrates timeout problem reported when uploading to nft.storage.

You can run it against https://nft.storage by running

```
API_KEY=<YOUR_API_KEY> python main.py
```

Or you can run it against your own dev endpoint by running (use your own URL for API_URL)

```
API_HOST=https://33ed172d4666.ngrok.io/upload API_URL=https://33ed172d4666.ngrok.io/upload python main.py
```


### Notes

It appears that order in wihch files are put can affect success / failure.

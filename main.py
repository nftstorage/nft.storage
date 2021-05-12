import requests
import os

# image = requests.get("https://lh3.googleusercontent.com/qlXMBaqHwvk4oeZTtH2h_T33I8F9ZgApnoNRybVHtAcxny3VTl8EPQhDw9Vc9TNmFqGZYmn1V62YclZdcqbM-sbx_bZAHQPCLDmJ0cA=s289")
# video = requests.get("https://storage.opensea.io/files/6430657c7e96bc93c140ba9554f07342.mp4")

files = [
  ('b', ('image', open('dog.jpg', 'rb'), 'image/jpeg')),
  ('a', ('animation', open('broken.mp4', 'rb'), 'video/mp4'))
]
api_key = os.getenv('API_KEY')
url=os.getenv('API_HOST') or "https://api.nft.storage/upload"

r = requests.post(url, headers={"Authorization": "Bearer {}".format(api_key)}, files=files)
print(r.json())

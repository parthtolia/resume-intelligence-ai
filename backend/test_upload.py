import httpx
import asyncio

async def test():
    async with httpx.AsyncClient(timeout=30) as client:
        with open('real_dummy.pdf', 'rb') as f:
            files = {'file': ('real_dummy.pdf', f, 'application/pdf')}
            response = await client.post('http://127.0.0.1:8000/api/resumes/upload', files=files)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")

if __name__ == "__main__":
    asyncio.run(test())

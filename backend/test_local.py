from fastapi.testclient import TestClient
from main import app
import builtins

# Override print to see everything directly
original_print = builtins.print
def loud_print(*args, **kwargs):
    original_print(">>> LOUD PRINT:", *args, **kwargs)
builtins.print = loud_print

client = TestClient(app)

with open('real_dummy.pdf', 'rb') as f:
    response = client.post(
        "/api/resumes/upload",
        files={"file": ("real_dummy.pdf", f, "application/pdf")}
    )
    
    with open('error_out.txt', 'w', encoding='utf-8') as err_f:
        err_f.write(response.text)
        
    print("STATUS:", response.status_code)
    print("Response written to error_out.txt")

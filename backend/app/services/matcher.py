import os
from sentence_transformers import SentenceTransformer

# Load the model from the Hugging Face Hub. 
# all-MiniLM-L6-v2 is a good balance of size and performance for semantic searches.
# Model initialization is expensive, so it should be loaded once at startup.
try:
    print("Loading SentenceTransformer model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def generate_embedding(text: str) -> list[float]:
    """Generates a text embedding using sentence-transformers."""
    if model is None:
        raise RuntimeError("SentenceTransformer model is not loaded.")
    
    # We generate the vector which is a numpy array, and convert it to a python list
    embedding = model.encode(text)
    return embedding.tolist()

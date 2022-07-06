from dotenv import load_dotenv
from pathlib import Path
from dotenv import dotenv_values

def get_env(path='backend-utils/.env'):
    return load_dotenv(dotenv_path=Path(path))

def get_values(path='backend-utils/.env'):
    return dotenv_values(Path(dotenv_path=path))
# santa

# Frontend : 

### 1. Clone the Repository
```bash
git clone {repository-url}
cd client
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```


# Backend: 
 
## Prerequisites
 
- Python 3.8 or higher
- pip (Python package installer)
- (Recommended) Virtual environment tool: `venv` or `virtualenv`
 
## Setup Instructions
 
### 1. Clone the repository
 
```bash
cd server
```

### 2. Create and activate a virtual environment

```bash
# Create virtual environment
virtualenv env 
# Activate on macOS/Linux
source env/bin/activate
 
# Activate on Windows
.\env\Scripts\activate
```

### 3. Install dependencies

``` bash
pip install django djangorestframework bcrypt pandas openpyxl django-cors-headers
```

### 4. Change directory in the backend folder

```bash
cd backend
```

### 7. Start the development server

```bash
python manage.py runserver
```

The backend will be accessible at: http://127.0.0.1:8000/
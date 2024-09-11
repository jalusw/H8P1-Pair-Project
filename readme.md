# Pair Project Phase 1

Repository ini berisi source code Tugas pair project phase 1 dengan tema e commerce

## Technologies Used

- Node.js
- Express
- Sequelize
- PostgreSQL 
- Nodemailer
- Multer

## Installation & Setup

 Clone the repository
 ```bash
git clone https://github.com/jalusw/H8P1-Pair-Project.git
```

Navigate to the directory
```bash
cd H8P1-Pair-Project
```

Install dependencies
```bash
npm install
```

Create or Initialize database
```bash
npm run db:init 
```

Run migration
```bash
npm run db:migrate
```

Run seeder
```bash
npm run db:seed
```

## Usage

Run the server
```bash
npm run start
npm run start:watch # live reload
npm run start:debug # with debugging
```


## Folder Structure
<<<<<<< HEAD
Proyek ini menggunakan pola arsitektur MVC dengan struktur folder sebagai
berikut :
=======

>>>>>>> c40da04a713cd6f1d9942597e58e6f9be9495474
```
controllers     -> controllers related (business logic)
routers         -> application routes 
models          -> database models (database)
views           -> view pages (user interface)
config          -> configuration files
.env            -> environment variables
README.md       -> Project documentation
```

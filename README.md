# ALLX-WPB-Elementor
This project is a custom child theme for the Hello Elementor WordPress template/page builder. It enhances Hello Elementor with advanced customization and integrates Gulp for automated asset management.

## Features

- **Gulp Integration**: Automatically compiles SCSS and JavaScript, then uploads the resulting CSS/JS to the child theme directory and remote server (`/var/www/html/[client_folder]/wp-content/themes/hello-elementor-child/`).
- **Custom Functions**: Easily modify theme functions in the child theme for added flexibility.
- **Streamlined Workflow**: Simplifies asset deployment and theme development.

## Getting Started

1. **Clone the Repository**  
    Download or clone this child theme into local computer.

2. **Install Dependencies**  
    In the theme directory, run:
    ```bash
    npm install
    ```

3. **Configure Remote Path**  
    Ensure your Gulp setup uses the remote path:  
    `/var/www/html/[client_folder]/wp-content/themes/hello-elementor-child/`

4. **Run Gulp**  
    Start Gulp to compile and upload assets:
    ```bash
    gulp
    ```

## Customization

- **SCSS/JS Files**: Edit files in `/assets/`. Gulp compiles and uploads them automatically.
- **functions.php**: Add or modify PHP functions as needed.

## Folder Structure

```
hello-elementor-child/
├── assets/
│   ├── scss/
│   └── js/
├── functions.php
├── gulpfile.js
└── package.json
```

## Requirements

- Node.js & npm
- Gulp CLI (`npm install -g gulp-cli`)

## License

MIT License

## Support

Open an issue in this repository for help or feature requests.
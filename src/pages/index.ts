export const showDashboard = (name: string, profile: string, email?: string) => {

    let page = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard</title>
        <style>
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            }

            body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f8;
            color: #333;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            }

            header {
            background-color: #2c3e50;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            }

            header .user {
            display: flex;
            align-items: center;
            gap: 1rem;
            }

            header .user img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                object-fit: cover;
            }

            footer {
                background-color: #2c3e50;
                color: white;
                text-align: center;
                padding: 1rem;
                font-size: 0.9rem;
            }

            a.button {
                background-color: #e74c3c;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                text-decoration: none;
                transition: background-color 0.2s ease;
            }

            a.button:hover {
                background-color: #c0392b;
            }

            @media (max-width: 500px) {
                header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;
                }
            }
        </style>
        </head>
        <body>
        <header>
            <h2>Bem-vindo, ${name}!</h2>
            <div class="user">
            <img src="${profile}" alt="Foto de perfil" />
            <a href="/logout" class="button">Sair</a>
            </div>
        </header>

        <footer>
            &copy; 2025 Todos os direitos reservados.
        </footer>
        </body>
        </html>

    `
    return page;
}

export const showLogin = () => {
    let login = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Login com Google</title>
        <style>
            * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(to right, #2193b0, #6dd5ed);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
            }

            .login-box {
                background-color: white;
                padding: 3rem 2rem;
                border-radius: 12px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                text-align: center;
                max-width: 400px;
                width: 100%;
            }

            .login-box h1 {
            margin-bottom: 1rem;
            font-size: 1.8rem;
            color: #333;
            }

            .login-box p {
            margin-bottom: 2rem;
            color: #666;
            }

            .google-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            color: #444;
            border: 1px solid #ccc;
            border-radius: 6px;
            padding: 0.6rem 1rem;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.3s ease;
            }

            .google-btn img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            }

            .google-btn:hover {
            background-color: #f0f0f0;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
            }

            @media (max-width: 480px) {
            .login-box {
                padding: 2rem 1rem;
            }

            .google-btn {
                font-size: 0.95rem;
            }
            }
        </style>
        </head>
        <body>
        <div class="login-box">
            <h1>Login</h1>
            <p>Use sua conta do Google para continuar</p>
            <a href="/auth/google" class="google-btn">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
            Entrar com Google
            </a>
        </div>
        </body>
        </html>


    `

    return login
}

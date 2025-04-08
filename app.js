const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
  };
  
  function navigate(path) {
    window.history.pushState({}, path, path);
    updateRoute();
  }
  
  function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];
  
    if (!route) {
      navigate('/login');
      return;
    }
  
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
  }
  
  function onLinkClick(event) {
    event.preventDefault();
    navigate(new URL(event.target.href).pathname);
  }
  
  window.onpopstate = () => updateRoute();
  updateRoute();

    async function register() {
        const registerForm = document.getElementById('registerForm');
        const formData = new FormData(registerForm);
        const jsonData = JSON.stringify(Object.fromEntries(formData));
        const result = await createAccount(jsonData);
      
        if (result.error) {
          return console.log('An error occurred:', result.error);
        }
      
        console.log('Account created!', result);
      }

  const result = await createAccount(jsonData);

  async function createAccount(account) {
    try {
      const response = await fetch('//localhost:5000/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: account,
      });
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
  }


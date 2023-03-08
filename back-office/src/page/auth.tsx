import { useState, useEffect, SetStateAction } from 'react'

export const Auth = () => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleMotDePasseChange = (event: any) => {
    setMotDePasse(event.target.value);
  };

  const valider = (event: any) => {
    event.preventDefault();
    console.log('Email :', email);
    console.log('Mot de passe :', motDePasse);
  };
  return (
    <section className='vh-1000 bg-light bg-gradient gradient-custom'>
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-success bg-gradent text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-5 text-uppercase">Authentification</h2>
                  <div className="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="Entrer votre email" value={email} onChange={handleEmailChange} />
                    <label className="form-label" htmlFor='typeEmailX' >Email</label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="Entrer votre mot de passe" value={motDePasse} onChange={handleMotDePasseChange} />
                    <label className="form-label" htmlFor="typePasswordX">Mot de passe</label>
                  </div>
                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Mot de passe oublié?</a></p>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={valider}>Se connecter</button>
                </div>
                <div>
                  <p className="mb-0"><a href="#!" className="text-white-50 fw-bold">Inscription</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
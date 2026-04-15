import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="px-5 py-12 text-center"
      style={{ background: '#2e3f2b' }}
    >
      <div className="flex justify-center mb-5">
        <img
          src="/logo-crema.png"
          alt="Wialth"
          className="h-[30px] w-auto"
          onError={e => {
            e.target.style.display = 'none'
            e.target.insertAdjacentHTML(
              'afterend',
              '<span class="font-h1 font-bold text-[1.1rem] text-cream tracking-[-0.03em]">Wialth</span>',
            )
          }}
        />
      </div>

      <p className="font-body font-light text-[.76rem] text-cream/70 leading-[1.9]">
        © 2026 Wialth · Todos los derechos reservados.<br />
        <Link to="/privacidad" className="text-cream/44 no-underline hover:text-cream/72 transition-colors duration-200">
          Política de Privacidad
        </Link>
        &nbsp;·&nbsp;
        <Link to="/aviso-legal" className="text-cream/44 no-underline hover:text-cream/72 transition-colors duration-200">
          Aviso Legal
        </Link>
        &nbsp;·&nbsp;
        <Link to="/cookies" className="text-cream/44 no-underline hover:text-cream/72 transition-colors duration-200">
          Cookies
        </Link>
      </p>

      <p className="sm:hidden mt-5 font-body font-light text-[.72rem] text-cream/50 tracking-[.02em]">
        Sin spam · Sin tarjeta · Cancela cuando quieras
      </p>
    </footer>
  )
}

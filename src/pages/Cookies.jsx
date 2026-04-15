import LegalLayout from '../components/LegalLayout.jsx'

export default function Cookies() {
  return (
    <LegalLayout title="Política de Cookies" lastUpdated="15 de abril de 2026">

      <Section title="1. Qué son las cookies">
        <p>Las cookies son pequeños archivos que los sitios web almacenan en tu navegador para recordar información sobre tu visita y mejorar tu experiencia.</p>
      </Section>

      <Section title="2. Qué cookies usamos">
        <p><strong>Cookies técnicas.</strong> Son imprescindibles para el funcionamiento del sitio. Permiten la navegación básica y el correcto funcionamiento de los formularios. No requieren tu consentimiento.</p>
        <p><strong>Cookies de análisis.</strong> Nos permiten entender cómo los visitantes usan el sitio web para mejorarlo. Utilizamos herramientas como Google Analytics, que recogen datos de forma agregada y anónima. Solo se activan si aceptas las cookies analíticas.</p>
        <p>Actualmente no usamos cookies publicitarias ni de seguimiento comportamental.</p>
      </Section>

      <Section title="3. Cómo gestionar las cookies">
        <p>Al entrar al sitio por primera vez, te mostramos un aviso para que puedas aceptar o rechazar las cookies no esenciales.</p>
        <p>También puedes configurar o eliminar cookies directamente desde tu navegador. Aquí te indicamos cómo hacerlo en los principales:</p>
        <ul>
          <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies.</li>
          <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies.</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad.</li>
          <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios.</li>
        </ul>
        <p>Ten en cuenta que desactivar ciertas cookies puede afectar al funcionamiento del sitio.</p>
      </Section>

      <Section title="4. Cookies de terceros">
        <p>Algunos servicios integrados en el sitio (como Google Analytics) pueden instalar sus propias cookies. Wialth no controla estas cookies directamente. Puedes consultar la política de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>
      </Section>

      <Section title="5. Cambios en esta política">
        <p>Podemos actualizar esta política cuando sea necesario. La versión vigente estará siempre disponible en esta página.</p>
      </Section>

      <Section title="6. Contacto">
        <p>Si tienes dudas sobre el uso de cookies, escríbenos a <a href="mailto:wialth@wialth.app">wialth@wialth.app</a>.</p>
      </Section>

    </LegalLayout>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="font-h1 font-bold text-[1.05rem] tracking-[-0.02em] text-hero-deep mb-3 pb-2
                     border-b border-hero-deep/12">
        {title}
      </h2>
      <div className="space-y-3 font-body font-light text-[.93rem] text-hero-deep/75 leading-[1.85]">
        {children}
      </div>
    </section>
  )
}

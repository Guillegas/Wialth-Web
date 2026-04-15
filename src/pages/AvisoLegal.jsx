import LegalLayout from '../components/LegalLayout.jsx'

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso Legal" lastUpdated="15 de abril de 2026">

      <Section title="1. Titular del sitio web">
        <p>Este sitio web es titularidad de <strong>Wialth</strong>. Para cualquier consulta legal puedes contactarnos en <a href="mailto:wialth@wialth.app">wialth@wialth.app</a>.</p>
      </Section>

      <Section title="2. Qué es Wialth">
        <p>Wialth AI es una aplicación de finanzas personales asistida por inteligencia artificial, diseñada para ayudarte a controlar tus gastos, establecer presupuestos y alcanzar tus objetivos de ahorro.</p>
        <p>En la fecha de publicación de este aviso, el servicio se encuentra en fase previa al lanzamiento. Este sitio web opera como página informativa y lista de espera.</p>
      </Section>

      <Section title="3. Condiciones de uso">
        <p>El acceso a este sitio web es libre y gratuito. Al usarlo, aceptas no emplearlo con fines ilícitos ni realizar acciones que puedan dañar, inutilizar o deteriorar el sitio o los derechos de terceros.</p>
        <p>Wialth se reserva el derecho de modificar, suspender o interrumpir el acceso al sitio web sin previo aviso.</p>
      </Section>

      <Section title="4. Propiedad intelectual">
        <p>Todos los contenidos de este sitio web —textos, imágenes, logotipos, diseño y código— son propiedad de Wialth o de sus licenciantes y están protegidos por la legislación sobre propiedad intelectual e industrial. Queda prohibida su reproducción o uso sin autorización expresa.</p>
      </Section>

      <Section title="5. Limitación de responsabilidad">
        <p>Wialth no garantiza la disponibilidad continua del sitio web ni se hace responsable de los daños derivados de interrupciones del servicio por causas ajenas a su control.</p>
        <p>Los análisis y recomendaciones generados por Wialth AI tienen carácter meramente informativo y no constituyen asesoramiento financiero profesional. Para decisiones relevantes, te recomendamos consultar a un profesional cualificado.</p>
      </Section>

      <Section title="6. Privacidad y cookies">
        <p>El tratamiento de datos personales se detalla en nuestra <a href="/privacidad">Política de Privacidad</a>. El uso de cookies se describe en la <a href="/cookies">Política de Cookies</a>.</p>
      </Section>

      <Section title="7. Legislación aplicable">
        <p>Este aviso legal se rige por la legislación española. Cualquier controversia derivada del uso del sitio web se someterá a los tribunales competentes conforme a la normativa aplicable.</p>
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

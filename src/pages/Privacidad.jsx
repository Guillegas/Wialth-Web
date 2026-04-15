import LegalLayout from '../components/LegalLayout.jsx'

export default function Privacidad() {
  return (
    <LegalLayout title="Política de Privacidad" lastUpdated="15 de abril de 2026">

      <Section title="1. Responsable del tratamiento">
        <p>El responsable del tratamiento de tus datos personales es <strong>Wialth</strong>, contactable en <a href="mailto:wialth@wialth.app">wialth@wialth.app</a>.</p>
      </Section>

      <Section title="2. Qué datos recogemos">
        <p>Únicamente recogemos tu <strong>dirección de correo electrónico</strong> cuando te unes a nuestra lista de espera. No solicitamos ningún otro dato personal.</p>
        <p>De forma automática, nuestros servidores pueden registrar datos técnicos básicos de navegación (dirección IP, tipo de navegador) con fines de seguridad y funcionamiento del sitio.</p>
      </Section>

      <Section title="3. Para qué usamos tus datos">
        <p>Tu email se usa exclusivamente para:</p>
        <ul>
          <li>Informarte del lanzamiento de la aplicación Wialth AI.</li>
          <li>Enviarte novedades y comunicaciones relacionadas con Wialth, siempre que hayas dado tu consentimiento.</li>
        </ul>
        <p>No vendemos ni cedemos tus datos a terceros con fines comerciales propios.</p>
      </Section>

      <Section title="4. Base jurídica">
        <p>El tratamiento de tus datos se basa en el <strong>consentimiento</strong> que otorgas al inscribirte en la lista de espera. Puedes retirar ese consentimiento en cualquier momento escribiéndonos a <a href="mailto:wialth@wialth.app">wialth@wialth.app</a>.</p>
      </Section>

      <Section title="5. Cuánto tiempo conservamos tus datos">
        <p>Conservamos tu email hasta que solicites la baja o transcurran 24 meses sin actividad, lo que ocurra primero. Tras ese plazo, tus datos serán eliminados.</p>
      </Section>

      <Section title="6. Tus derechos">
        <p>Tienes derecho a acceder, rectificar, suprimir, limitar u oponerte al tratamiento de tus datos, así como a solicitar su portabilidad. Para ejercer cualquiera de estos derechos, escríbenos a <a href="mailto:wialth@wialth.app">wialth@wialth.app</a>.</p>
        <p>Si consideras que el tratamiento no es conforme a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.</p>
      </Section>

      <Section title="7. Seguridad">
        <p>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o alteración.</p>
      </Section>

      <Section title="8. Cambios en esta política">
        <p>Podemos actualizar esta política en cualquier momento. Si los cambios son relevantes, te lo comunicaremos por correo electrónico o mediante un aviso en el sitio web.</p>
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

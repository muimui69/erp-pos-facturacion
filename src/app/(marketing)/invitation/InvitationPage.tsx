import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';


export const InvitationPage: React.FC = () => {
  const containerStyles: React.CSSProperties = {
    maxWidth: 800,
    margin: '30px auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    borderRadius: '5px',
    width: '100%', // Contenedor ocupa todo el ancho disponible

  };
  const rejectButtonStyles: React.CSSProperties = {

    display: 'inline-block',
    padding: '2px 2px', // Estilo para un botón más pequeño
    backgroundColor: '#ff5733', // Color rojo
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '10px'
  };
  const buttonStyles: React.CSSProperties = {
    flex: '1',
    display: 'inline-block',
    padding: '10px 20px',
    margin: '20px 0',
    backgroundColor: '#26c6da',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '10px',// Agrega propiedades específicas como 'cursor' si es necesario
  };

  const footerStyles: React.CSSProperties = {
    fontSize: '12px',
    color: '#777777',
    marginTop: '20px',
  };

  const headerStyles: React.CSSProperties = {
    fontWeight: 'bold',
  };


  return (
    <div style={containerStyles}>
      <img
        src="https://emprenderconactitud.com/img/nety.png"
        alt="Logo"
        style={{ height: '100px', margin: '0 auto 20px', display: 'block' }}
      />
      <h1 style={headerStyles}>¡Ya casi estás listo/a!</h1>
      <p className='pt-1'>Hola,asd</p>
      <p className='pt-2'>
        Te damos la bienvenida a PointSync, el sistema integral de gestión empresarial  diseñado para facilitar la administración de tu empresa.
        Con PointSync, podrás gestionar tus operaciones diarias, llevar un control eficiente del inventario, administrar la facturación y realizar ventas con nuestro sistema de punto de venta .
        Estamos emocionados de tenerte a bordo y esperamos que disfrutes de todas las ventajas que ofrece PointSync para optimizar tus procesos empresariales.
      </p>
      <Link href="" style={buttonStyles}>
        ACEPTAR INVITACION
      </Link>
      <a href="#" style={rejectButtonStyles}>
        Rechazar
      </a>

      <p style={footerStyles}>
        Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
      </p>
      <p style={footerStyles}>Atentamente,</p>
      <p style={footerStyles}>PointSync</p>
    </div>
  );
};



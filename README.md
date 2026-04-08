<h1 align="center">📘 GradeManagerPro</h1>
<p align="center">
  Gestor de notas para estudiantes de medicina desarrollado con <b>React + Vite</b>
</p>

<hr/>

<h2>🎯 Descripción</h2>
<p>
GradeManagerPro es una aplicación web diseñada para estudiantes de medicina que necesitan gestionar sus materias,
exámenes y promedios de manera realista, superando las limitaciones de Excel.
</p>

<p>
A diferencia de otros sistemas, esta app contempla que una materia puede tener múltiples finales (aprobados y desaprobados),
los cuales impactan directamente en el promedio final.
</p>

<hr/>

<h2>🧩 Funcionalidades</h2>

<ul>
  <li>📚 Crear, editar y eliminar materias</li>
  <li>📝 Agregar múltiples finales por materia</li>
  <li>📊 Cálculo automático de promedios</li>
  <li>📌 Estados de materia: Pendiente, Regular, Aprobada</li>
  <li>📥 Registro de fuente de nota:
    <ul>
      <li>Sistema</li>
      <li>WhatsApp</li>
      <li>LU</li>
      <li>Manual</li>
    </ul>
  </li>
  <li>🌙 Modo oscuro</li>
  <li>⚡ Funciona en memoria (rápido y simple)</li>
</ul>

<hr/>

<h2>🧠 Lógica del sistema</h2>

<p>
El promedio de cada materia se calcula en base a <b>todos los finales rendidos</b>, no solo el aprobado.
</p>

<pre>
Ejemplo:

Inmunología:
- Final 1: 2 (desaprobado)
- Final 2: 3 (desaprobado)
- Final 3: 7 (aprobado)

Promedio = (2 + 3 + 7) / 3
</pre>

<p>
Esto permite reflejar la realidad académica de la carrera de medicina.
</p>

<hr/>

<h2>🏗️ Estructura del proyecto</h2>

<pre>
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── context/
 ├── utils/
 └── models/
</pre>

<hr/>

<h2>🚀 Tecnologías</h2>

<ul>
  <li>React</li>
  <li>Vite</li>
  <li>JavaScript (ES6+)</li>
  <li>CSS / Tailwind (opcional)</li>
</ul>

<hr/>

<h2>🔮 Futuras mejoras</h2>

<ul>
  <li>Importar/exportar Excel</li>
  <li>Persistencia de datos</li>
  <li>Autenticación de usuario</li>
  <li>Estadísticas y gráficos</li>
</ul>

<hr/>

<h2>💡 Diferencial</h2>

<p>
✔ Modela correctamente múltiples intentos de finales<br/>
✔ Permite registrar distintas fuentes de notas<br/>
✔ Evita errores manuales de cálculo<br/>
✔ Interfaz moderna y escalable
</p>

<h2>SCREENSHOTS</h2>
<img width="1029" height="726" alt="image" src="https://github.com/user-attachments/assets/a9fa17bc-a7cb-404f-9360-8209cb849c6e" />

<img width="1029" height="726" alt="image" src="https://github.com/user-attachments/assets/c1e2d8fe-6c6a-45a9-872e-b13ca6ebe6b9" />
<img width="849" height="688" alt="image" src="https://github.com/user-attachments/assets/7696c1a4-7e15-4739-a1fa-ac18f39e634f" />


<hr/>

<p align="center">
  🚀 Proyecto pensado para resolver un problema real en estudiantes de medicina
</p>

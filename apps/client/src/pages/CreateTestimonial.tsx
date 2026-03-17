import { useState } from 'react';
import styles from './CreateTestimonial.module.css';

export default function CreateTestimonial() {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('producto');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('content', content);
      formData.append('author', author);
      formData.append('videoUrl', videoUrl);
      formData.append('category', category);

      if (file) {
        formData.append('file', file);
      }

      const res = await fetch('http://localhost:3000/testimonials', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error al crear testimonio');
      }

      alert('Testimonio creado 🔥');

      // 🔥 limpiar form
      setContent('');
      setAuthor('');
      setVideoUrl('');
      setFile(null);
      setCategory('producto');

    } catch (error) {
      console.error(error);
      alert('Hubo un error ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nuevo Testimonio</h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Contenido</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Autor</label>
        <input
          className={styles.input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Video URL</label>
        <input
          className={styles.input}
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Imagen</label>
        <input
          className={styles.fileInput}
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Categoría</label>
        <select
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="producto">Producto</option>
          <option value="evento">Evento</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>

      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar Testimonio'}
      </button>
    </div>
  );
}
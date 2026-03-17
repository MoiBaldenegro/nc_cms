import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditTestimonial.module.css';

export default function EditTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 cargar datos
  const load = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/testimonials`);
    const data = await res.json();

    const t = data.find((item: any) => item.id === id);

    if (t) {
      setContent(t.content);
      setAuthor(t.author);
      setVideoUrl(t.videoUrl || '');
      setCategory(t.category || '');
      setTags(t.tags ? t.tags.join(', ') : '');
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔥 guardar cambios
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      await fetch(`http://localhost:3000/testimonials/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          author,
          videoUrl,
          category,
          tags: tags.split(',').map(t => t.trim()),
        }),
      });

      alert('Actualizado 🔥');
      navigate('/');
    } catch (error) {
      alert('Error ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Editar Testimonio</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>Contenido</label>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el testimonio..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Autor</label>
          <input
            className={styles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Nombre del autor"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Video URL</label>
          <input
            className={styles.input}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Categoría</label>
          <input
            className={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ej: producto, servicio"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tags</label>
          <input
            className={styles.input}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separados por coma"
          />
        </div>

        <button 
          className={styles.button} 
          onClick={handleUpdate} 
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}
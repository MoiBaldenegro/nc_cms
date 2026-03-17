import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { testimonialService } from '../services/createTestimonial';

type Testimonial = {
  id: string;
  content: string;
  author: string;
  status: string;
  imageUrl?: string;
  videoUrl?: string;
  category?: string;
  tags?: string[];
};

export default function Dashboard() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 cargar datos (con búsqueda)
  const load = async () => {
    try {
      setLoading(true);
      const res = await testimonialService.getAll(search);
      setData(res);
    } catch (error) {
      console.error(error);
      alert('Error cargando testimonios ❌');
    } finally {
      setLoading(false);
    }
  };

  // 🔥 aprobar
  const approve = async (id: string) => {
    try {
      await testimonialService.approve(id);
      await load();
    } catch (error) {
      alert('Error al aprobar ❌');
    }
  };

  // 🔥 eliminar con confirm
  const remove = async (id: string) => {
    if (!confirm('¿Eliminar testimonio?')) return;

    try {
      const token = localStorage.getItem('token');

      await fetch(`http://localhost:3000/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await load();
    } catch (error) {
      alert('Error al eliminar ❌');
    }
  };

  // 🔥 convertir youtube → embed
  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  useEffect(() => {
    load();
  }, [search]);

  return (
    <div>
      <h1>Testimonios</h1>

      {/* 🔍 BUSCADOR */}
      <input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ➕ CREAR */}
      <button onClick={() => navigate('/create')}>
        Crear Testimonio
      </button>

      {loading && <p>Cargando...</p>}

      {data.map((t) => (
        <div
          key={t.id}
          style={{
            border: '1px solid gray',
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <p><strong>{t.content}</strong></p>
          <p>{t.author}</p>
          <p>Status: {t.status}</p>

          {/* 🏷️ categoría */}
          {t.category && <p>Categoría: {t.category}</p>}

          {/* 🧠 tags */}
          {t.tags && (
            <p>Tags: {t.tags.join(', ')}</p>
          )}

          {/* 🖼️ imagen */}
          {t.imageUrl && (
            <img src={t.imageUrl} width={200} />
          )}

          {/* 🎥 video */}
          {t.videoUrl && (
            <iframe
              width="200"
              height="150"
              src={getEmbedUrl(t.videoUrl)}
              allowFullScreen
            />
          )}

          {/* 🔥 acciones */}
          <div style={{ marginTop: 10 }}>
            <button onClick={() => remove(t.id)}>
              Eliminar
            </button>

            {t.status === 'pending' && (
              <button onClick={() => approve(t.id)}>
                Aprobar
              </button>
            )}

            <button onClick={() => navigate(`/edit/${t.id}`)}>
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
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
};

export default function Dashboard() {
  const [data, setData] = useState<Testimonial[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await testimonialService.getAll();
    setData(res);
  };

  const approve = async (id: string) => {
    await testimonialService.approve(id);
    await load();
  };

   const getEmbedUrl = (url: string) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Testimonios</h1>

      {/* 🔥 BOTÓN PARA CREAR */}
      <button onClick={() => navigate('/create')}>
        Crear Testimonio
      </button>

      {data.map((t) => (
        <div key={t.id} style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
          <p>{t.content}</p>
          <p>{t.author}</p>
          <p>{t.status}</p>

          {/* 🔥 MOSTRAR IMAGEN */}
          {t.imageUrl && (
            <img src={t.imageUrl} width={200} />
          )}

          {/* 🔥 MOSTRAR VIDEO */}
          {t.videoUrl && (
            <iframe
              width="200"
              height="150"
              src={getEmbedUrl(t.videoUrl)}
              allowFullScreen
            />
          )}

          {t.status === 'pending' && (
            <button onClick={() => approve(t.id)}>
              Aprobar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
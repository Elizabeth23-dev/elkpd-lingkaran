import { daftarMateri } from '../../data/materi';

interface SuggestedRoute {
  title: string;
  uri: string;
}

interface RouteDescription {
  suggestedRoutes: SuggestedRoute[];
  itemTitle: string;
}

export function getRouteDescription(): RouteDescription {
  return {
    suggestedRoutes: daftarMateri.map((materi) => ({
      title: materi.title,
      uri: `/latihan/${materi.id}`,
    })),
    itemTitle: 'Soal Latihan',
  };
}

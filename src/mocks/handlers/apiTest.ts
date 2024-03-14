import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/api/test', () => {
    return HttpResponse.json([
      {
        useId: 1,
        name: '김진영',
      },
      {
        useId: 2,
        name: '박혜민',
      },
      {
        useId: 3,
        name: '임채린',
      },
      {
        useId: 4,
        name: '정선우',
      },
    ]);
  }),
];

export default handlers;

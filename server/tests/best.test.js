const {
  beforeAll,
  afterAll,
  describe,
  test,
  expect,
} = require('@jest/globals');
const { connect, close } = require('./db');
const { getLatest, add, remove } = require('../controller/best');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await close();
});

const getSamplePhoto = (id) => {
  const timestamp = Math.round(new Date().getTime() / 10000);
  return {
    id,
    message: '',
    picture: 'https://www.example.com/image.jpg',
    timestamp,
  };
};

const getSamplePhotos = (no = 1) => {
  const photos = [];
  for (let i = 0; i < no; i += 1) {
    photos.push(getSamplePhoto(i));
  }
  return photos;
};

describe('Photos route test', () => {
  test('photos get', async (done) => {
    const latest = await getLatest();
    expect(latest).toStrictEqual({
      ok: true,
    });
    done();
  });

  test('insert photo', async (done) => {
    const photos = getSamplePhotos(1);
    const result = await add(photos);
    expect(result).toBeTruthy();

    // verify the latest is same
    const latest = await getLatest();
    expect(latest.data.photos).toStrictEqual(photos);

    // insert another
    const photos2 = getSamplePhotos(2);
    const result2 = await add(photos2);
    expect(result2.data.photos).toStrictEqual(photos2);

    // verify the latest is same
    const latest2 = await getLatest();
    expect(latest2.data.photos).toStrictEqual(photos2);

    done();
  });

  test('delete photo', async () => {
    const removed = await remove();
    expect(removed).toStrictEqual({ ok: true });

    // verify

    const latest = await getLatest();
    expect(latest).toStrictEqual({ ok: true });
  });
});

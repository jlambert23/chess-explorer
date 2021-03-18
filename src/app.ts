import { connect } from './controllers/_server';

async function main() {
  try {
    await connect();
  } catch (e) {
    console.error(e);
  }
}

(async () => main())();

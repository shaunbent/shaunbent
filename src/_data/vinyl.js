export default async function() {
  const token = process.env.DISCOGS_TOKEN;
  const username = process.env.DISCOGS_USERNAME || 'shaunbent';

  if (!token) {
    console.warn('⚠️  DISCOGS_TOKEN not set - using empty vinyl collection');
    return [];
  }

  try {
    console.log(`📀 Fetching vinyl collection for ${username}...`);

    // First, get the collection folders to find the "All" folder (usually folder_id: 0)
    const foldersResponse = await fetch(
      `https://api.discogs.com/users/${username}/collection/folders`,
      {
        headers: {
          'Authorization': `Discogs token=${token}`,
          'User-Agent': 'ShaunBentPortfolio/1.0'
        }
      }
    );

    if (!foldersResponse.ok) {
      throw new Error(`Discogs API error: ${foldersResponse.status}`);
    }

    const foldersData = await foldersResponse.json();
    const allFolder = foldersData.folders.find(f => f.name === 'All' || f.id === 0);

    if (!allFolder) {
      console.warn('⚠️  Could not find "All" folder');
      return [];
    }

    // Fetch all releases from the collection
    const releasesResponse = await fetch(
      `https://api.discogs.com/users/${username}/collection/folders/${allFolder.id}/releases?per_page=100`,
      {
        headers: {
          'Authorization': `Discogs token=${token}`,
          'User-Agent': 'ShaunBentPortfolio/1.0'
        }
      }
    );

    if (!releasesResponse.ok) {
      throw new Error(`Discogs releases API error: ${releasesResponse.status}`);
    }

    const releasesData = await releasesResponse.json();

    // Transform the data to what we need
    const vinyl = releasesData.releases.map(item => ({
      id: item.id,
      artist: item.basic_information.artists.map(a => a.name).join(', '),
      title: item.basic_information.title,
      year: item.basic_information.year,
      coverImage: item.basic_information.cover_image,
      thumb: item.basic_information.thumb,
      label: item.basic_information.labels?.[0]?.name,
      formats: item.basic_information.formats?.map(f => f.name).join(', '),
      discogsUrl: `https://www.discogs.com${item.basic_information.resource_url.replace('https://api.discogs.com', '')}`
    }));

    console.log(`✅ Fetched ${vinyl.length} vinyl records`);
    return vinyl;

  } catch (error) {
    console.error('❌ Error fetching vinyl collection:', error.message);
    return [];
  }
}

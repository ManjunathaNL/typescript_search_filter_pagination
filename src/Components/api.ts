const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface DataItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ResponseData {
  items: DataItem[];
  count: number;
}

export interface DataQueryParams {
  page: number;
  limit: number;
}

// adds preceding underscore per JSONPlaceholder API
function generateQueryString(obj: any): string {
  return Object.keys(obj)
    .map((key) => `_${key}=${obj[key]}`)
    .join("&");
}

export async function fetchData(
  params: DataQueryParams
): Promise<ResponseData> {
  const url = `${BASE_URL}/todos?${generateQueryString(params)}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    console.error("Error fetching data from API");
  }

  const json = await response.json();

  return {
    items: json,
    count: +(response.headers.get("X-Total-Count") ?? 0)
  };
}

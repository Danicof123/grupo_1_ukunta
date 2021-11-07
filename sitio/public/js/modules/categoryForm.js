import asuk from "./asuk.js";
import capitalize from "../utils/capitalize.js";

const d = document;

export const getCategory = async ($select) => {
  const categories = await asuk.get('/api/products/categories'),
        $fragment = d.createDocumentFragment();
  
  categories.forEach(cat => {
    const $option = d.createElement('option');

    $option.value = cat.id;
    $option.text = capitalize(cat.name)

    $fragment.appendChild($option);
  })

  $select.appendChild($fragment)
}

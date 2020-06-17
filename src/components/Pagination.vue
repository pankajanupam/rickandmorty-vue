<template>
  <nav aria-label="Pagination">
    <ul class="pagination text-center">
      <li class="pagination-previous disabled" @click.prevent="page=characters.info.prev">Previous</li>
      <li class="current"> 1 </li>
      <li><a href="#" aria-label="Page 2">2</a></li>
      <li><a href="#" aria-label="Page 3">3</a></li>
      <li><a href="#" aria-label="Page 4">4</a></li>
      <li class="ellipsis"></li>
      <li><a href="#" aria-label="Page 12">12</a></li>
      <li><a href="#" aria-label="Page 13">13</a></li>
      <li class="pagination-next"><a href="#" @click.prevent="page=characters.info.next" aria-label="Next page">Next</a></li>
    </ul>
  </nav>
</template>

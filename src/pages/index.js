import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';

function BlogIndex(props) {
  return (
    <Layout>
      <SEO title="Shaun Bent" />
      <header>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
        adipisci? Nesciunt id, ipsam rerum minus vero velit qui maiores,
        pariatur nulla assumenda fuga quis. Dolorum ea quidem quam
        maiores sequi!
      </header>
      <main>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
        adipisci veniam dignissimos. Eos minima quos accusamus nobis
        architecto quasi laboriosam modi, impedit doloremque sit ducimus
        aliquid, libero qui quibusdam iusto?
      </main>
      <footer>Copyright &copy; 2019-2020</footer>
    </Layout>
  );
}

export default BlogIndex;

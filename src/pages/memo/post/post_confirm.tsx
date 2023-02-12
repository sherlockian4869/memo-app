import type { NextPage } from 'next';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import Layout from '~/src/components/Layout';
import { memoState } from '../../../states/memoState';

const PostConfirmView: NextPage = () => {
  const input = useRecoilValue(memoState);
  return (
    <Layout>
      <div>
        <form>
          <div>
            <label>
              <span>id:</span>
              <div>{input.id}</div>
            </label>
          </div>
          <div>
            <label>
              <span>title:</span>
              <div>{input.title}</div>
            </label>
          </div>
          <div>
            <label>
              <span>content:</span>
              <div>{input.content}</div>
            </label>
          </div>
          <div>
            <Link href='/'>Back Input</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PostConfirmView;

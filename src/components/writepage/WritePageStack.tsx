import { products, develops, designs } from 'utils/skills';
import SkillButton from 'components/common/SkillButton';
import styled from '@emotion/styled';

const WritePageStack = () => {
  return (
    <WritePageStackContainer>
      <WritePageLeftBox>
        <WritePageStackText>필요 스택</WritePageStackText>
      </WritePageLeftBox>
      <WirtePageRightBox>
        <WritePageStackProductBox>
          <WritePageStackProductLeftBox>
            <WritePageStackCategoryText>기획</WritePageStackCategoryText>
          </WritePageStackProductLeftBox>
          <WritePageStackProductRightBox>
            {products.map((product) => (
              <SkillButton key={product} name={product} />
            ))}
          </WritePageStackProductRightBox>
        </WritePageStackProductBox>
        <WritePageStackDeveloopBox>
          <WritePageStackDevelopLeftBox>
            <WritePageStackCategoryText>개발</WritePageStackCategoryText>
          </WritePageStackDevelopLeftBox>
          <WritePageStackDevelopRightBox>
            {develops.map((develop) => (
              <SkillButton key={develop} name={develop} />
            ))}
          </WritePageStackDevelopRightBox>
        </WritePageStackDeveloopBox>
        <WritePageStackDesignBox>
          <WritePageStackDesignLeftBox>
            <WritePageStackCategoryText>디자인</WritePageStackCategoryText>
          </WritePageStackDesignLeftBox>
          <WritePageStackDesignRightBox>
            {designs.map((design) => (
              <SkillButton key={design} name={design} />
            ))}
          </WritePageStackDesignRightBox>
        </WritePageStackDesignBox>
      </WirtePageRightBox>
    </WritePageStackContainer>
  );
};

const WritePageStackContainer = styled.div`
  width: 100%;
  max-width: 70.875rem;
  display: flex;
  flex-direction: row;
`;
const WritePageLeftBox = styled.div`
  width: 10%;
`;
const WirtePageRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;
const WritePageStackText = styled.h2`
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
const WritePageStackProductBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageStackProductLeftBox = styled.div`
  width: 8%;
`;
const WritePageStackProductRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;
const WritePageStackDeveloopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageStackDevelopLeftBox = styled.div`
  width: 8%;
`;
const WritePageStackDevelopRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;
const WritePageStackDesignBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageStackDesignLeftBox = styled.div`
  width: 8%;
`;
const WritePageStackDesignRightBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;
const WritePageStackCategoryText = styled.p`
  height: 1.75rem;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.75rem;
  color: #383838;
  margin-right: 1.2rem;
`;

export default WritePageStack;
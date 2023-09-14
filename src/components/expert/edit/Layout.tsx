import ExpertMarketContainer from '../../../containers/expert/edit/ExpertMarketContainer';
import ExpertActivateContainer from '../../../containers/expert/edit/ExpertActivateContainer';
import ExpertAddressContainer from '../../../containers/expert/edit/ExpertAddressContainer';
import ExpertBusinessNumberContainer from '../../../containers/expert/edit/ExpertBusinessNumberContainer';
import ExpertCareerContainer from '../../../containers/expert/edit/ExpertCareerContainer';
import ExpertContentContainer from '../../../containers/expert/edit/ExpertContentContainer';
import ExpertImagesContainer from '../../../containers/expert/edit/ExpertImagesContainer';
import SubmitContainer from '../../../containers/expert/edit/SubmitContainer';
import AddView from '../../commons/AddView';
import CollapseBox from '../../commons/CollapseBox';
import ExpertNameContainer from '../../../containers/expert/edit/ExpertNameContainer';
import ExpertThumbnailContainer from '../../../containers/expert/edit/ExpertThumbnailContainer';
import ExpertProfileContainer from '../../../containers/expert/edit/ExpertProfileContainer';
import ExpertUserEmailContainer from '../../../containers/expert/edit/ExpertUserEmailContainer';
import ExpertCategoriesContainer from '../../../containers/expert/edit/ExpertCategoriesContainer';
import DeleteContainer from '../../../containers/expert/edit/DeleteContainer';

interface ILayout {
    userId: string;
    expertId: string;
}

const Layout: React.FC<ILayout> = ({ userId, expertId }) => {
    return (
        <AddView
            title={'도소매 수정'}
            submitContainer={
                <SubmitContainer userId={userId} expertId={expertId} />
            }
            deleteContainer={
                <DeleteContainer userId={userId} expertId={expertId} />
            }
        >
            <CollapseBox title={'기본 정보'}>
                <ExpertUserEmailContainer />
                <ExpertNameContainer />
                <ExpertBusinessNumberContainer />
                <ExpertAddressContainer />
                <ExpertCareerContainer />
                <ExpertProfileContainer />
                <ExpertMarketContainer />
                <ExpertActivateContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 소개글'}>
                <ExpertContentContainer />
            </CollapseBox>
            <CollapseBox title={'도소매 이미지 정보'}>
                <ExpertThumbnailContainer />
                <ExpertImagesContainer />
            </CollapseBox>
            <CollapseBox title={'카테고리 정보'}>
                <ExpertCategoriesContainer />
            </CollapseBox>
        </AddView>
    );
};

export default Layout;

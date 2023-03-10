import {
  useCallback,
  useState,
  ChangeEvent,
  useRef,
  MouseEvent,
  useEffect,
} from 'react';
import { useRecoilValue } from 'recoil';
import { deletedPidState } from '../recoil/atoms';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseEditProjectRequest } from 'apis/boardService';
import { useModal, useToastPopup } from 'hooks';
import { getCurrentPathName, logEvent } from 'utils/amplitude';
import {
  contentValidation,
  deadlineValidation,
  periodValidation,
  positionValidation,
  stackValidation,
  titleValidation,
} from 'utils/validation';
import Resizer from 'react-image-file-resizer';

const useEditBoard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const editRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const deletedPid = useRecoilValue(deletedPidState);

  const [editFormValue, setEditFormValue] = useState<EditType.EditFormType>(
    state || JSON.parse(sessionStorage.getItem('editFormValue') || '{}'),
  );
  const [editThumbnail, setEditThumbnail] = useState<File | null>(null);

  useEffect(() => {
    sessionStorage.setItem('editFormValue', JSON.stringify(editFormValue));

    return () => {
      sessionStorage.removeItem('editFormValue');
    };
  }, [state]);

  const { isOpen, handleModalStateChange } = useModal(false);
  const {
    isOpen: isPrompt,
    handleModalOpenChange,
    handleModalCloseChange,
  } = useModal(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  const { mutate: editProjectRequest } = useMutation(
    (resizedFile: File | null) =>
      firebaseEditProjectRequest(
        params.id as string,
        editFormValue,
        editRef.current.getInstance().getMarkdown(),
        resizedFile,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', params.id]);
        navigate(`/project/${params.id}`, {
          replace: true,
        });
      },
    },
  );

  const handleCheckValidationButtonClick = useCallback(() => {
    const {
      title,
      positions,
      plannerStack,
      designerStack,
      developerStack,
      startDate,
      endDate,
      deadline,
    } = editFormValue;
    const markdownText = editRef.current.getInstance().getMarkdown();
    const validations = [
      {
        isValid: titleValidation(title.trim()),
        message: '????????? ????????? 5??? ?????? 40??? ????????? ??????????????????.',
      },
      {
        isValid: positionValidation(positions),
        message: '???????????? ?????? 1??? ?????? ??????????????????.',
      },
      {
        isValid: stackValidation(
          plannerStack,
          designerStack,
          developerStack,
          positions,
        ),
        message: '???????????? ????????? ?????? 1??? ?????? ??????????????????.',
      },
      {
        isValid: periodValidation(startDate, endDate),
        message: '?????? ????????? ?????? ???????????? ?????? ??? ????????????.',
      },
      {
        isValid: deadlineValidation(deadline, TodayDate),
        message: '?????? ????????? ?????? ????????? ??????????????????.',
      },
      {
        isValid: contentValidation(markdownText.trim()),
        message: '?????? ????????? 10??? ?????? ???????????????.',
      },
    ];

    const invalidValidation = validations.find(({ isValid }) => !isValid);
    if (invalidValidation) {
      handleToastPopup(invalidValidation.message);
      return;
    }
    handleModalStateChange();
  }, [editFormValue]);

  const handleEditProjectButtonClick = async () => {
    if (!params.id) {
      return;
    }
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'project_detail',
      name: 'project_edit',
    });
    if (!editThumbnail) {
      editProjectRequest(imageRef.current.files[0]);
      return;
    }
    const resizedFile = await resizeFile(editThumbnail);
    editProjectRequest(resizedFile as File);
  };

  const handleAddThumbnailImage = useCallback(() => {
    imageRef.current?.click();
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'project_detail',
      name: 'add_thumbnail_image',
    });
  }, [imageRef]);

  const handleAddThumbnailImageChange = () => {
    setEditThumbnail(
      imageRef.current?.files?.length ? imageRef.current.files[0] : '',
    );
    setEditFormValue({
      ...editFormValue,
      thumbnail: imageRef.current?.files?.length
        ? imageRef.current.files[0].name
        : '',
    });
  };

  const handleFormValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setEditFormValue((prev: EditType.EditFormType) => {
        if (['planner', 'designer', 'frontend', 'backend'].includes(name)) {
          return {
            ...prev,
            positions: {
              ...prev.positions,
              [name]: Number(value),
            },
          };
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setEditFormValue],
  );

  const handleCalculate = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { id, name, value } = e.currentTarget;
      const numberValue = Number(value);
      const updatedValue =
        id === 'plus' ? numberValue + 1 : Math.max(0, numberValue - 1);
      setEditFormValue((prev: EditType.EditFormType) => ({
        ...prev,
        positions: {
          ...prev.positions,
          [name]: updatedValue,
        },
      }));
    },
    [setEditFormValue],
  );

  const preventGoBack = () => {
    history.pushState(null, '', location.href);
    handleModalOpenChange();
  };

  const preventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handlePreventGoBack = useCallback(() => {
    handleModalCloseChange();
    window.removeEventListener('popstate', preventGoBack);
    return navigate(-2);
  }, []);

  useEffect(() => {
    (() => {
      if (deletedPid) return;
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', preventGoBack);
      window.addEventListener('beforeunload', preventRefresh);
    })();

    return () => {
      if (deletedPid) return;
      window.removeEventListener('popstate', preventGoBack);
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  return {
    isOpen,
    isPrompt,
    editRef,
    imageRef,
    showToast,
    ToastMessage,
    editThumbnail,
    editFormValue,
    setEditFormValue,
    handleCalculate,
    handlePreventGoBack,
    handleFormValueChange,
    handleModalStateChange,
    handleModalCloseChange,
    handleAddThumbnailImage,
    handleEditProjectButtonClick,
    handleAddThumbnailImageChange,
    handleCheckValidationButtonClick,
  };
};

const TIME_ZONE = 3240 * 10000;
const TodayDate = new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0];

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1900,
      1200,
      'WEBP',
      60,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob',
    );
  });

export default useEditBoard;

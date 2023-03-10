import {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  MouseEvent,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useModal, useToastPopup } from 'hooks';
import { firebaseCreateProjectRequest } from 'apis/boardService';
import { WriteType } from 'types/write/writeType';
import { getCurrentPathName, logEvent } from 'utils/amplitude';
import {
  titleValidation,
  contentValidation,
  positionValidation,
  periodValidation,
  deadlineValidation,
  stackValidation,
} from './../utils/validation';
import Resizer from 'react-image-file-resizer';

const useWrite = () => {
  const navigate = useNavigate();

  const editRef = useRef<any>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [writeFormValue, setWriteFormValue] = useState<WriteType.WriteFormType>(
    initialWriteFormValue,
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { uid } = useAuth();
  const { isOpen, handleModalStateChange } = useModal(false);
  const {
    isOpen: isPrompt,
    handleModalOpenChange,
    handleModalCloseChange,
  } = useModal(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

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
    } = writeFormValue;
    const markdownText = editRef.current.getInstance().getMarkdown();
    const invalidValidation = [
      {
        isValid: titleValidation(title.trim()),
        message: '타이틀 길이는 5자 이상 40자 이하로 작성해주세요.',
      },
      {
        isValid: positionValidation(positions),
        message: '포지션을 최소 1개 이상 선택해주세요.',
      },
      {
        isValid: stackValidation(
          plannerStack,
          designerStack,
          developerStack,
          positions,
        ),
        message: '해당하는 스택을 최소 1개 이상 선택해주세요.',
      },
      {
        isValid: periodValidation(startDate, endDate),
        message: '시작 날짜가 종료 날짜보다 늦을 수 없습니다.',
      },
      {
        isValid: deadlineValidation(deadline, TodayDate),
        message: '마감 날짜는 오늘 이후로 설정해주세요.',
      },
      {
        isValid: contentValidation(markdownText.trim()),
        message: '내용 길이는 10자 이상 적어주세요.',
      },
    ].find(({ isValid }) => !isValid);

    if (invalidValidation) {
      handleToastPopup(invalidValidation.message);
      return;
    }
    handleModalStateChange();
  }, [writeFormValue]);

  const handleCreateProjectButtonClick = async () => {
    const { thumbnail } = writeFormValue;
    const markdownText = editRef.current.getInstance().getMarkdown();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let resizedImage = null;
      if (thumbnail) {
        resizedImage = await resizeFile(thumbnail);
      }

      const docId = await firebaseCreateProjectRequest(
        writeFormValue,
        markdownText,
        resizedImage,
        uid,
      );
      logEvent('Button Click', {
        from: getCurrentPathName(),
        to: 'project_detail',
        name: 'write_project',
      });
      navigate(`/project/${docId}`, {
        replace: true,
      });
    } catch {
      handleToastPopup('프로젝트 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddThumbnailImage = useCallback(() => {
    imageRef.current?.click();
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'none',
      name: 'add_thumbnail_image',
    });
  }, [imageRef]);

  const handleAddThumbnailImageChange = () => {
    setWriteFormValue({
      ...writeFormValue,
      thumbnail: imageRef.current?.files?.length
        ? imageRef.current.files[0]
        : '',
    });
  };

  const handleFormValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setWriteFormValue((prev: WriteType.WriteFormType) => {
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
    [setWriteFormValue],
  );

  const handleCalculate = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { id, name, value } = e.currentTarget;
      const numberValue = Number(value);
      const updatedValue =
        id === 'plus' ? numberValue + 1 : Math.max(0, numberValue - 1);
      setWriteFormValue((prev: any) => ({
        ...prev,
        positions: {
          ...prev.positions,
          [name]: updatedValue,
        },
      }));
    },
    [setWriteFormValue],
  );

  const preventGoBack = () => {
    history.pushState(null, '', location.href);
    handleModalOpenChange();
  };

  const handlePreventGoBack = useCallback(() => {
    handleModalCloseChange();
    window.removeEventListener('popstate', preventGoBack);
    return navigate(-2);
  }, []);

  useEffect(() => {
    (() => {
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', preventGoBack);
    })();

    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  return {
    isOpen,
    isPrompt,
    editRef,
    imageRef,
    showToast,
    isSubmitting,
    ToastMessage,
    writeFormValue,
    setWriteFormValue,
    handleCalculate,
    handlePreventGoBack,
    handleFormValueChange,
    handleModalStateChange,
    handleModalCloseChange,
    handleAddThumbnailImage,
    handleAddThumbnailImageChange,
    handleCreateProjectButtonClick,
    handleCheckValidationButtonClick,
  };
};

const TIME_ZONE = 3240 * 10000;
const TodayDate = new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0];
const TommorrowDate = new Date(+new Date() + TIME_ZONE + 86400000)
  .toISOString()
  .split('T')[0];

const initialWriteFormValue: WriteType.WriteFormType = {
  title: '',
  positions: {
    planner: 0,
    designer: 0,
    frontend: 0,
    backend: 0,
  },
  thumbnail: null,
  plannerStack: [],
  developerStack: [],
  designerStack: [],
  startDate: TodayDate,
  endDate: TommorrowDate,
  deadline: TodayDate,
};

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

export default useWrite;

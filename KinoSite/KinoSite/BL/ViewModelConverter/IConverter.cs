namespace KinoSite.BL.ViewModelConverter
{
    public interface IConverter<TInput, TResult>
        where TInput : class
        where TResult : class
    {
        TResult Convert(TInput viewModel);
    }
}
